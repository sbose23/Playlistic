import './styles/Playlist.css'

type VideoFormProps = {
    videos: Array<string>,
    setVideos: React.Dispatch<React.SetStateAction<Array<string>>>
}

function VideoList(props: VideoFormProps){

    return (
        <div>
            Videos (click to remove):
        </div>
    )

}

export default VideoList;