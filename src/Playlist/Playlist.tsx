import { useReducer } from 'react';
import ReactPlayer from 'react-player/youtube'
import VideoForm from './VideoForm';
//test one second video: https://youtu.be/Wch3gJG2GJ4

type PlaylistProps = {
    videos: Array<string>,
    setVideos: React.Dispatch<React.SetStateAction<Array<string>>>
}

function Playlist(props: PlaylistProps){
    const [videoIndex, nextVideo] = useReducer(index => index + 1, 0)
    console.log("Videos: " + props.videos.toString())
    return (
        <div>
            <VideoForm videos={props.videos} setVideos={props.setVideos}/>
            <br></br>
            {props.videos.length === 0 ? <p>No videos</p>:<ReactPlayer loop = {true} 
                                                            url = {props.videos[videoIndex]} 
                                                            controls={true} onEnded={nextVideo}/>}
        </div>
    )
}

export default Playlist;