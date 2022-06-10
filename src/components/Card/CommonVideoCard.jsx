import "./CommonVideoCard.css";
import { useVideoActions } from "common/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

const CommonVideoCard = ({ videoData, category, className }) => {
    const { removeLikedVideoOnLikedVideosPage } = useVideoActions();
    const cardRef = useRef(null);

    const deleteVideoCardHandler = (event) => {
        if(category === "Liked") {
            removeLikedVideoOnLikedVideosPage(event, videoData);
        }
        cardRef.current.classList.add("video-card-display-none");
    }

    return (
        <div className={`card space-S ${className}`} ref={cardRef}>
            <div className="card-img">
                <img src={`https://i.ytimg.com/vi/${videoData._id}/0.jpg`} alt="video thumbnail" />
            </div>
            
            <div className="header-and-options">
                <div className="card-header">{videoData.title}</div>
                <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={(event) => deleteVideoCardHandler(event) } />
            </div>

            <div className="card-title">{videoData.categoryName}</div>
        </div>
    );
}

export { CommonVideoCard };