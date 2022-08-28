import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";

//type for user playlists object - string (playlistname-playlistid): array of videos
type userPlaylistsType = {
  [item: string]: Array<string>;
};

//props type
type UserPlaylistProps = {
  userPlaylists: userPlaylistsType;
  setUserPlaylists: React.Dispatch<React.SetStateAction<userPlaylistsType>>;
  setVideos: React.Dispatch<React.SetStateAction<Array<string>>>;
};

function UserPlaylists(props: UserPlaylistProps) {

  //destrcture set state for useEffect dependency
  const setUserPlaylists = props.setUserPlaylists;

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  async function deletePlaylist(playlist: string) {
    if (!isAuthenticated) {
      return;
    }

    const playlistID = playlist.split("-")[0];
    const token = await getAccessTokenSilently();
    const response = await axios
      .get(
        (process.env.REACT_APP_ADPLAYLIST as string) +
          "?token=" +
          token +
          "&action=Delete&playlistID=" +
          playlistID
      )
      .catch((e) => console.log(e));
    if (response?.status === 200) {
      let newUserPlaylists = JSON.parse(JSON.stringify(props.userPlaylists));
      delete newUserPlaylists[playlist];
      setUserPlaylists(newUserPlaylists);
    }
  }

  //emulate componentDidMount, execute only on component render
  useEffect(() => {
    async function getUserPlaylists() {
      if (!isAuthenticated) {
        return;
      }
      const token = await getAccessTokenSilently();
      await axios
        .get(
          (process.env.REACT_APP_GETUSERPLAYLISTS as string) + "?token=" + token
        )
        .then((response) => {
          setUserPlaylists(response?.data);
        })
        .catch((error) => console.log(error));
    }
    getUserPlaylists();
  }, [getAccessTokenSilently, setUserPlaylists, isAuthenticated]);

  const playlists = Object.keys(props.userPlaylists);

  if (!isAuthenticated) {
    return (
      <div>
        🎵 My Playlists 🎵 <br></br>
        <br></br>
        <br></br>
        <br></br>
        (Login to save playlists)
        <br></br>
      </div>
    );
  }

  return (
    <div>
      🎵 My Playlists 🎵
      {isAuthenticated ? (
        <div>
          {" "}
          <br></br>
          {playlists.map((playlist) => {
            return (
              <div>
                <button
                  className="playlistButton"
                  onClick={() => {
                    const d = [
                      ...props.userPlaylists[playlist],
                      "Playlist~" + playlist,
                    ];
                    props.setVideos(d);
                  }}
                >
                  {playlist.split("-")[1]}
                </button>{" "}
                <button
                  className="playlistDelete"
                  onClick={() => deletePlaylist(playlist)}
                >
                  Delete
                </button>
                <p className="playlistID">ID: {playlist.split("-")[0]}</p>
                <hr></hr>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <br></br>Login to save
        </div>
      )}
    </div>
  );
}

export default UserPlaylists;
