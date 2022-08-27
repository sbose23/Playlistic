import { CSSProperties, useReducer, useState } from "react";
import ReactPlayer from "react-player/youtube";
import VideoForm from "./VideoForm";
import VideoList from "./VideoList";
import "./styles/Playlist.css";
import TypeWriter, { TypewriterClass } from "typewriter-effect";
import SaveButton from "./SaveButton";

const videoPlayerStyle: CSSProperties = {
  display: "flex",
  paddingLeft: "70%",
  color: "lightskyblue",
  fontWeight: "bold",
};

//test one second video: https://youtu.be/Wch3gJG2GJ4

type PlaylistProps = {
  videos: Array<string>;
  setVideos: React.Dispatch<React.SetStateAction<Array<string>>>;
};

function Playlist(props: PlaylistProps) {
  const [videoIndex, nextVideo] = useReducer((index) => index + 1, 0);
  const [playing, setPlaying] = useState<boolean>(false);
  //console.log("Videos: " + props.videos.toString());
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
      <button onClick={() => null}>console log something</button>

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
          <SaveButton videos={props.videos} setVideos={props.setVideos} />
          <p style={videoPlayerStyle}>Video Player 📻 </p>
          <ReactPlayer
            loop={true}
            width={"27%"}
            height={"200px"}
            style={videoPlayerStyle}
            playing={playing}
            url={props.videos[videoIndex]}
            controls={true}
            onEnded={nextVideo}
          />
        </div>
      )}
    </div>
  );
}

export default Playlist;
