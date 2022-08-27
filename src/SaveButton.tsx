import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

//props type
type VideoFormProps = {
  videos: Array<string>;
  setVideos: React.Dispatch<React.SetStateAction<Array<string>>>;
};

function SaveButton(props: VideoFormProps) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  async function addPlaylist(
    playlistID: string,
    playlistName: string,
    playlistVideos: Array<string> = []
  ) {
    const token = await getAccessTokenSilently();
    await axios
      .get(process.env.REACT_APP_ADPLAYLIST as string, {
        headers: {
          authorization: `Bearer ${token}`,
          action: "Add",
          playlistID: playlistID,
          playlistName: playlistName,
          playlist: playlistVideos.join("-"),
        },
      })
      .catch((e) => console.log(e));
  }

  //have field for name too
  return (
    <div>
      {isAuthenticated && props.videos.length !== 0 ? (
        <div>Save button</div>
      ) : null}
    </div>
  );
}

export default SaveButton;
