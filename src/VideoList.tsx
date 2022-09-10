import "./styles/Playlist.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

//props type
type VideoFormProps = {
  videos: Array<string>;
  setVideos: React.Dispatch<React.SetStateAction<Array<string>>>;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

function VideoList(props: VideoFormProps) {
  let videos: Array<string> = [...props.videos];
  let playlistTag = "";
  if (props.videos[props.videos.length - 1].startsWith("Playlist")) {
    playlistTag = videos.pop() as string;
  }

  //handle list drop event
  const handleDrop = (droppedItem: any) => {
    console.log(droppedItem)
    //copy current list to new variable
    let newList: Array<string> = [...videos];

    //drop location in list, reorder the list
    if (droppedItem.destination) {
      const [reorderedItem] = newList.splice(droppedItem.source.index, 1);
      newList.splice(droppedItem.destination.index, 0, reorderedItem);
      console.log(newList)
      //if drop location outside the list, delete item
    } else {
      newList.splice(droppedItem.source.index, 1);
    }
    newList.push(playlistTag)

    //loop to handle an error adding spaces on drop in list
    for (let i = 0; i < newList.length; i++) {
      if (newList[i] === "") {
        newList.splice(i, 1)
      }
    }
    
    //set videos prop to the new list
    props.setVideos(newList);
  };

  return (
    <div>
      <b>
        Videos{" "}
        {props.playing ? (
          <button className="pause" onClick={() => props.setPlaying(false)}>
            Pause
          </button>
        ) : (
          <button className="play" onClick={() => props.setPlaying(true)}>
            Play
          </button>
        )}
      </b>

      <div>
        <i>
          <small>
            Drag and drop to change order. Drop above or below the list to
            remove video<br></br>
          </small>
        </i>
        <DragDropContext onDragEnd={handleDrop}>
          <Droppable droppableId="z">
            {(provided) => (
              <div
                className="list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {videos.map((video, index) => (
                  <Draggable
                    key={video + index}
                    draggableId={video + index}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="video"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {index + 1} {video}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default VideoList;
