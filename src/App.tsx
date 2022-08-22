import './styles/App.css';
import './Playlist/Playlist'
import Playlist from './Playlist/Playlist';
import UserAuth from './UserAuth';
import { useState } from 'react';

function App() {
  const [videos, setVideos] = useState<Array<string>>([]);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <UserAuth/>
          <Playlist videos={videos} setVideos={setVideos}/>
        </p>
      </header>
    </div>
  );
}

export default App;
