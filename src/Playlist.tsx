import { CSSProperties, useReducer, useState } from 'react';
import ReactPlayer from 'react-player/youtube'
import VideoForm from './VideoForm';
import VideoList from './VideoList';
import './styles/Playlist.css'
import TypeWriter, { TypewriterClass } from 'typewriter-effect';
import {useAuth0} from '@auth0/auth0-react';
import axios from 'axios';

const api:string = (process.env.REACT_APP_ADPLAYLIST as string);

const videoPlayerStyle: CSSProperties = {
    display: 'flex',
    paddingLeft: '70%',
    color: 'lightskyblue',
    fontWeight: 'bold'
}

//test one second video: https://youtu.be/Wch3gJG2GJ4

type PlaylistProps = {
    videos: Array<string>,
    setVideos: React.Dispatch<React.SetStateAction<Array<string>>>
}

function Playlist(props: PlaylistProps) {
    const {getAccessTokenSilently} = useAuth0()
    //async function getJWT(){
      //  const token = await getAccessTokenSilently();
        //console.log(token)
    //}
    //getJWT(), this function go in SaveButton prob
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function addOrDeletePlaylist(action: "Add" | "Delete", playlistID:string,
                                        playlistName: string = 'Unnamed', playlistVideos: Array<string> = []) {
        let playlist:string = "";

        if (action === "Add"){
            playlist = playlistVideos.join("-");
        }
        const token = await getAccessTokenSilently();
        const response = await axios.get(api, {
            headers: {
                authorization: `Bearer ${token}`,
                action: action,
                playlistID:playlistID,
                playlistName: playlistName,
                playlist: playlist
            }
        }).catch(e => console.log(e))
        console.log(response)
    }

    const [videoIndex, nextVideo] = useReducer(index => index + 1, 0)
    const [playing, setPlaying] = useState<boolean>(false)
    //console.log("Videos: " + props.videos.toString());
    return (
        <div>
            <h3>
                Playlistic:<TypeWriter onInit={(t: TypewriterClass) => 
                    t.typeString("A Playlist Creation and Sharing Platform 🔥").start()}/>
            </h3>
            <button onClick={() => null}>console log something</button>

            <br></br>
            <VideoForm videos={props.videos} setVideos={props.setVideos}/>

            <br></br>
            {props.videos.length === 0 ? 
                <p>No videos 😢</p> : 
                <div>
                    <br></br>
                    <VideoList videos={props.videos} setVideos={props.setVideos} 
                                setPlaying={setPlaying} playing={playing}/>
                    <p style={videoPlayerStyle}>Video Player 📻 </p>
                    <ReactPlayer loop={true} width={'27%'} height={'200px'} style={videoPlayerStyle} playing={playing}
                                url={props.videos[videoIndex]} controls={true} onEnded={nextVideo}/>
                </div>}                                                   
        </div>
    )
}

export default Playlist;