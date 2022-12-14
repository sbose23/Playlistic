import { CSSProperties, useReducer, useState } from "react";
import ReactPlayer from "react-player/youtube";
import VideoForm from "./VideoForm";
import VideoList from "./VideoList";
import "./styles/Playlist.css";
import TypeWriter, { TypewriterClass } from "typewriter-effect";
import SaveButton from "./SaveButton";

const videoPlayerStyle: CSSProperties = {
  display: "flex",
  color: "lightskyblue",
  fontWeight: "bold",
};

type userPlaylistsType = {
  [item: string]: Array<string>;
};

type PlaylistProps = {
  videos: Array<string>;
  setVideos: React.Dispatch<React.SetStateAction<Array<string>>>;
  userPlaylists: userPlaylistsType;
  setUserPlaylists: React.Dispatch<React.SetStateAction<userPlaylistsType>>;
};

function Playlist(props: PlaylistProps) {
  let len: number = props.videos.length;
  const [playing, setPlaying] = useState<boolean>(false);

  let videos: Array<string> = [];

  //if video list belongs to playlist, pop last element
  if (len > 0 && props.videos[len - 1].startsWith("Playlist")) {
    videos = props.videos.slice(0, len - 1);
    len -= 1;
  } else {
    videos = props.videos;
  }

  //increment video index if videos are left, otherwise reset to 0
  const [videoIndex, nextVideo] = useReducer(
    (index) => (index >= len - 1 ? (index = 0) : index + 1),
    0
  );

  return (
    <div>
      <h3>
        Playlistic:
        <TypeWriter
          onInit={(t: TypewriterClass) =>
            t.typeString("A Playlist Creation and Sharing Platform 🔥").start()
          }
        />
      </h3>
      <br></br>

      <VideoForm videos={props.videos} setVideos={props.setVideos} />

      <br></br>
      {props.videos.length === 0 ? (
        <p>No videos 😢</p>
      ) : (
        <div>
          <br></br>
          <VideoList
            videos={props.videos}
            setVideos={props.setVideos}
            setPlaying={setPlaying}
            playing={playing}
          />
          <br></br>

          <SaveButton
            videos={props.videos}
            setVideos={props.setVideos}
            userPlaylists={props.userPlaylists}
            setUserPlaylists={props.setUserPlaylists}
          />

          <p style={videoPlayerStyle}>Video Player 📻 </p>
          <ReactPlayer
            width={"100vmin"}
            style={videoPlayerStyle}
            playing={playing}
            url={videos[videoIndex]}
            controls={true}
            onEnded={nextVideo}
          />
        </div>
      )}
    </div>
  );
}

export default Playlist;
