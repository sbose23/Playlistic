import ReactPlayer from 'react-player/youtube'
import VideoForm from './VideoForm';
import { useState } from 'react';

//test one second video: https://youtu.be/Wch3gJG2GJ4

function Playlist(){
    //need to change to useReducer probably
    const [videos, setVideos] = useState([]);
    console.log(videos);
    
    //if no videos exist return this
    if (videos.length === 0){
        return (      
        <div>
            <VideoForm videos={videos} setVideos={setVideos}/>
            <br></br>
            No videos
        </div>
        )
    }

    return (
        <div>
            <VideoForm videos={videos} setVideos={setVideos}/>
            <br></br>
            <ReactPlayer loop = {true} url = {videos} controls={true}/>
        </div>
    )
}

export default Playlist;