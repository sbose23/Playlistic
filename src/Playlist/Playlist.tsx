import { useReducer } from 'react';
import ReactPlayer from 'react-player/youtube'
import VideoForm from './VideoForm';
import '../styles/Playlist.css'
import TypeWriter, { TypewriterClass } from 'typewriter-effect';
import {useAuth0} from '@auth0/auth0-react';

//test one second video: https://youtu.be/Wch3gJG2GJ4

type PlaylistProps = {
    videos: Array<string>,
    setVideos: React.Dispatch<React.SetStateAction<Array<string>>>
}

function Playlist(props: PlaylistProps){
    const {user} = useAuth0() //testing
    const [videoIndex, nextVideo] = useReducer(index => index + 1, 0)
    console.log("Videos: " + props.videos.toString())
    return (
        <div>
            <h3>
                Playlistic:<TypeWriter onInit={(t: TypewriterClass) => t.typeString("A Playlist Creation and Sharing Platform 🔥").start()}/>
            </h3>
            <button onClick={() => console.log(user)}>console log user test</button>
            <br></br>
            <VideoForm videos={props.videos} setVideos={props.setVideos}/>
            <br></br>
            {props.videos.length === 0 ? <p>No videos 😢</p> : <ReactPlayer loop = {true} 
                                                            url = {props.videos[videoIndex]} 
                                                            controls={true} onEnded={nextVideo}/>}
        </div>
    )
}

export default Playlist;