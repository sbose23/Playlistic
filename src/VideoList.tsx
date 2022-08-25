import './styles/Playlist.css'
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

type VideoFormProps = {
    videos: Array<string>,
    setVideos: React.Dispatch<React.SetStateAction<Array<string>>>,
    playing: boolean,
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

function VideoList(props: VideoFormProps){
    
    const handleDrop = (droppedItem: any) => {
        console.log(droppedItem)
        let newList = [...props.videos]

        //drop location in list, reorder the list
        if (droppedItem.destination) {
            const [reorderedItem] = newList.splice(droppedItem.source.index, 1)
            newList.splice(droppedItem.destination.index, 0, reorderedItem)
        
        //if drop location outside, list delete item
        } else {
            newList.splice(droppedItem.source.index, 1)
        }
        
        props.setVideos(newList)}
    
    return (
        <div>
            <b>Videos {props.playing ? <button className="pause" onClick={() => props.setPlaying(false)}>Pause</button> 
                        : <button className="play" onClick={() => props.setPlaying(true)}>Play</button>}</b>
            <div>
            <i><small>Drag and drop to change order. Drop above or below the list to remove video</small></i>
                <DragDropContext onDragEnd={handleDrop}>
                    <Droppable droppableId='z'>
                        {(provided) => (
                            <div className="list" {...provided.droppableProps} ref={provided.innerRef}>
                                {props.videos.map((video, index) => (
                                    <Draggable key={video+index} draggableId={video+index} index={index}>
                                        {(provided) => (
                                            <div className="video" {...provided.draggableProps} 
                                            {...provided.dragHandleProps} 
                                            ref={provided.innerRef}>
                                                {index + 1} {video}                                         
                                            </div>)}
                                    </Draggable>))}
                                    {provided.placeholder}
                                </div>)}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )

}

export default VideoList;