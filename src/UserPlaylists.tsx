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
    const playlistID = playlist.split("-")[0];
    const token = await getAccessTokenSilently();
    const response = await axios
      .get(process.env.REACT_APP_ADPLAYLIST as string, {
        headers: {
          authorization: `Bearer ${token}`,
          action: "Delete",
          playlistID: playlistID,
        },
      })
      .catch((e) => console.log(e));
    if (response?.status === 200) {
      let newUserPlaylists = JSON.parse(JSON.stringify(props.userPlaylists));
      delete newUserPlaylists.playlist;
      setUserPlaylists(newUserPlaylists);
    }
  }

  //emulate componentDidMount
  useEffect(() => {
    async function getUserPlaylists() {
      console.log("doing useEffect");
      const token = await getAccessTokenSilently();
      const response = await axios
        .get(process.env.REACT_APP_GETUSERPLAYLISTS as string, {
          headers: { authorization: `Bearer ${token}` },
        })
        .catch((error) => console.log(error));
      setUserPlaylists(response?.data);
    }
    getUserPlaylists();
  }, [getAccessTokenSilently, setUserPlaylists]);

  const playlists = Object.keys(props.userPlaylists);

  if (!isAuthenticated) {
    return (
      <div>
        My Playlists:<br></br>
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
      My Playlists:
      {isAuthenticated ? (
        <div>
          {playlists.length === 0 ? (
            <p>Add a playlist</p>
          ) : (
            <div>
              {" "}
              <br></br>
              {playlists.map((playlist) => {
                return (
                  <div>
                    <button
                      className="playlistButton"
                      onClick={() =>
                        props.setVideos(props.userPlaylists[playlist])
                      }
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
          )}
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
