import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";
import "./styles/SaveButton.css";

type userPlaylistsType = {
  [item: string]: Array<string>;
};

//props type
type VideoFormProps = {
  videos: Array<string>;
  setVideos: React.Dispatch<React.SetStateAction<Array<string>>>;
  userPlaylists: userPlaylistsType;
  setUserPlaylists: React.Dispatch<React.SetStateAction<userPlaylistsType>>;
};

function generateID() {
  return Math.floor(
    Date.now() / Math.floor(Math.random() * 10000) + 5000
  ).toString();
}

function SaveButton(props: VideoFormProps) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [currentName, setCurrentName] = useState<string>("");
  const last: string = props.videos[props.videos.length - 1];
  let idAndName: string,
    playlistID: string,
    playlistName: string = "";

  if (props.videos.length > 0 && last.startsWith("Playlist")) {
    idAndName = last.split("~")[1];
    playlistID = idAndName.split("-")[0];
    playlistName = idAndName?.split("-")[1];
  } else {
    playlistName = "Unnamed";
  }

  async function addPlaylist(
    playlistID: string,
    playlistName: string,
    playlistVideos: Array<string> = []
  ) {
    console.log(
      "Adding playlist with " + playlistID + playlistName + playlistVideos
    );
    const token = await getAccessTokenSilently();
    const videosString: string = playlistVideos.join("~");
    await axios
      .get(
        (process.env.REACT_APP_ADPLAYLIST as string) +
          "?token=" +
          token +
          "&action=Add&playlistID=" +
          playlistID +
          "&playlistName=" +
          playlistName +
          "&videosString=" +
          videosString
      )
      .then(() => {
        let copy: userPlaylistsType = JSON.parse(
          JSON.stringify(props.userPlaylists)
        );
        const d = playlistID + "-" + playlistName;
        copy[d] = playlistVideos;
        props.setUserPlaylists(copy);
      })
      .catch((e) => console.log(e));
  }

  async function handleSave(e: any) {
    e.preventDefault();

    async function addNew(videos: Array<string>) {
      const id = generateID();
      await addPlaylist(id, currentName, videos);
      let newVids: Array<string> = [...props.videos];
      newVids.push("Playlist~" + id + "-" + currentName);
      props.setVideos(newVids);
    }

    //if videos have a playlist identification, update it accordingly
    if (last.startsWith("Playlist")) {
      
      //remove playlist identification tag
      const videos = [...props.videos];
      videos.pop();

      //if the current name is the same as user given name or empty (no change), use same playlistID and name
      currentName === playlistName || currentName === ""
        ? await addPlaylist(playlistID, playlistName, videos)
        : await addNew(videos);
        
    } else {
      await addNew(props.videos);
    }
  }

  return (
    <div>
      {isAuthenticated && props.videos.length !== 0 ? (
        <div>
          <form onSubmit={(e) => handleSave(e)}>
            <small className="playlistNameTag"> Playlist Name: </small>
            <input
              className="playlistNameInput"
              placeholder={playlistName}
              maxLength={10}
              onChange={(e) => setCurrentName(e.target.value)}
            />
            <button className="saveButton">Save 💾</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default SaveButton;
