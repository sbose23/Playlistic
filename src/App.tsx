import './styles/App.css';
import './Playlist/Playlist'
import Playlist from './Playlist/Playlist';
import UserAuth from './UserAuth';
import { useState } from 'react';


function App() {
  const [videos, setVideos] = useState<Array<string>>([]);
  return (
    <div>
      <UserAuth/>
      <div className="App">
        <Playlist videos={videos} setVideos={setVideos}/>
        <br></br><br></br><br></br>
        <footer>
          <a href="https://github.com/sbose23/Playlistic" rel="noreferrer noopener" target="_blank">Front-end Source Code </a>
          ➕
          <a href="https://github.com/sbose23/Playlistic-API" rel="noreferrer noopener" target="_blank"> Back-end Source Code </a>
          on GitHub 👀
        </footer>
      </div>
    </div>
  );
}

export default App;
