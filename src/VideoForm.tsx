import { useState } from 'react';
import ReactPlayer from 'react-player';
import './styles/App.css';

type VideoFormProps = {
    videos: Array<string>,
    setVideos: React.Dispatch<React.SetStateAction<Array<string>>>
}

function VideoForm (props: VideoFormProps) {

    const [address, setAddress] = useState<string>("");

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
            <span>
            <form onSubmit={addVideo}>
                <input size = {30} required placeholder="Enter a YouTube video address... 👈"
                        onChange={(e) => setAddress(e.target.value)}/>
                <br></br><br></br>
                <button className = "submit">Add Video ✔</button>
            </form>
            </span>

        </div>
    );
}

export default VideoForm;