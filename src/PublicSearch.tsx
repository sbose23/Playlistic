import axios from "axios";
import { useState } from "react";
import "./styles/PublicSearch.css";

type PublicSearchProps = {
  setVideos: React.Dispatch<React.SetStateAction<Array<string>>>;
};

function PublicSearch(props: PublicSearchProps) {
  const [userName, setUserName] = useState<string>("");
  const [playlistID, setPlaylistID] = useState<string>("");

  const search = async (e: any) => {
    e.preventDefault();
    await axios
      .get(
        (process.env.REACT_APP_GETPLAYLIST as string) +
          "?userID=" +
          userName +
          "&playlistID=" +
          playlistID
      )
      .then((response) => {
        props.setVideos(response.data);
      })
      .catch((error) => {
        alert(
          "No playlist exists for user " +
            userName +
            " with playlist ID " +
            playlistID
        );
      });
  };

  return (
    <div className="publicSearch">
      Public Search 🔍:
      <form onSubmit={search}>
        <small className="searchTag"> Username: </small>
        <input
          className="searchInput"
          required
          placeholder="Under login/signup"
          onChange={(e) => setUserName(e.target.value)}
        />
        <br></br>
        <small className="searchTag">Playlist ID: </small>
        <input
          className="searchInput"
          required
          placeholder="Under playlist"
          onChange={(e) => setPlaylistID(e.target.value)}
        />
        <br></br>
        <button className="searchButton">Search</button>
      </form>
    </div>
  );
}

export default PublicSearch;
