import './styles/App.css';
import './Playlist/Playlist'
import Playlist from './Playlist/Playlist';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Playlist/>
        </p>
      </header>
    </div>
  );
}

export default App;
