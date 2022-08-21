import { useState } from 'react';
import ReactPlayer from 'react-player';
import '../../src/styles/App.css';

function VideoForm(props: any) {

    const [address, setAddress] = useState("");

    const addVideo = async (e: any) => {
        e.preventDefault();
        if (ReactPlayer.canPlay(address)){
            props.setVideos([...props.videos, address])
        }else {
            alert("Invalid YouTube video")
        }
    }

    return (
        <div>
            <h3>Add Video: </h3>
            <form onSubmit={addVideo}>
                <input size = {30} required placeholder="Enter a YouTube video address"
                        onChange={(e) => setAddress(e.target.value)}/>
                <br></br>
                <button className = "submit">Add Video</button>
            </form>

        </div>
    );
}

export default VideoForm;