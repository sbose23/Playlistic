import "./styles/App.css";
import Playlist from "./Playlist";
import UserAuth from "./UserAuth";
import { useState } from "react";
import UserPlaylists from "./UserPlaylists";
import PublicSearch from "./PublicSearch";

function App() {
  //state to keep track of current playlist videos
  const [videos, setVideos] = useState<Array<string>>([]);

  //type for user playlists object - string (playlistname-playlistid): array of videos
  type userPlaylistsType = {
    [item: string]: Array<string>;
  };

  //state to keep track of a user's playlists
  const [userPlaylists, setUserPlaylists] = useState<userPlaylistsType>({});

  return (
    <div>
      <UserAuth />
      <div className="App">
        <div className="userPlaylists">
          <PublicSearch setVideos={setVideos} />
          <br></br>
          <hr></hr>
          <UserPlaylists
            setVideos={setVideos}
            userPlaylists={userPlaylists}
            setUserPlaylists={setUserPlaylists}
          />
        </div>
        <br></br>
        <div className="main">
          <Playlist
            userPlaylists={userPlaylists}
            setUserPlaylists={setUserPlaylists}
            videos={videos}
            setVideos={setVideos}
          />
        </div>
        <br></br>
        <br></br>
        <br></br>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <footer>
        <a
          href="https://github.com/sbose23/Playlistic"
          rel="noreferrer noopener"
          target="_blank"
        >
          Front-end Source Code{" "}
        </a>
        ➕
        <a
          href="https://github.com/sbose23/Playlistic-API"
          rel="noreferrer noopener"
          target="_blank"
        >
          {" "}
          Back-end Source Code{" "}
        </a>
        on GitHub 👀
      </footer>
    </div>
  );
}

export default App;
