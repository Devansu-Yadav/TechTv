import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpFilled } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player/youtube";
import { useVideoActions } from "common/helpers";
import { useVideosData } from "common/context";
import { toast } from "react-toastify";

const VideoListCard = ({ videoData, className }) => {
    const { isVideoInLikedVideos, toggleLikedVideo, addVideoToWatchHistory } = useVideoActions();
    const { setVideoListModal, setCurrentVideo } = useVideosData();

    const shareButtonClickHandler = async (event) => {
        event.preventDefault();

        try {
            await navigator.clipboard.writeText(videoData.videoUrl);
            toast.info("Copied Video URL to clipboard!");
        } catch(err) {
            toast.error("Could not copy Video URL to clipboard!");
        }
    }

    return (
        <div className={`card space-S ${className}`}>
            <div className="card-img">
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoData._id}`}
                    controls
                    width="100%"
                    height="100%"
                    onStart={() => addVideoToWatchHistory(videoData)}
                />
            </div>

            <div className="title-and-options">
                <div className="card-header">{videoData.title}</div>
                <FontAwesomeIcon icon={faEllipsisVertical} className="options-icon" onClick={(event) => {
                    event.preventDefault();
                    setVideoListModal(true);
                    setCurrentVideo(videoData);
                }} />
            </div>

            <div className="card-title">{videoData.categoryName}</div>

            <div className="card-buttons">
                <button className="btn-icon btn-icon-default rounded-med space-S" onClick={(event) => toggleLikedVideo(event, videoData)}>
                    {isVideoInLikedVideos(videoData._id) ? 
                    <FontAwesomeIcon className="like-icon" icon={faThumbsUpFilled} /> 
                    : <FontAwesomeIcon className="like-icon" icon={faThumbsUp} /> }
                    Like
                </button>

                <button className="btn-icon btn-icon-default rounded-med space-S" onClick={(event) => shareButtonClickHandler(event)}>
                    <FontAwesomeIcon className="share-icon" icon={faShareNodes} />
                    Share
                </button>
            </div>
        </div>
    );
}

export { VideoListCard };