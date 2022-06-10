import "./PlayListCard.css";
import { useVideoActions } from "common/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

const PlayListCard = ({ playListData, className }) => {
    const { removePlayListOnPlayListPage } = useVideoActions();
    const cardRef = useRef(null);

    const deletePlayListCardHandler = (event) => {
        removePlayListOnPlayListPage(event, playListData);
        cardRef.current.classList.add("playlist-card-display-none");
    }

    return (
        <div className={`card space-S ${className}`} ref={cardRef}>
            <div className="card-img">
                <img src={ !playListData.length ? `https://i.ytimg.com/vi/no_thumbnail.jpg` : `https://i.ytimg.com/vi/${playListData.videos[0]._id}/0.jpg`} alt="video thumbnail" />
                <div className="videos-count-container center-flex-col-container">
                    <div className="video-count">{playListData.videos.length}</div>
                    <img className="playlist-icon" src="https://res.cloudinary.com/bluekart/image/upload/v1654674372/add-to-playlist-icon_ojjers.png" alt="video count" />
                </div>
            </div>
            
            <div className="header-and-options">
                <div className="card-header">{playListData.title}</div>
                <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={(event) => deletePlayListCardHandler(event) } />
            </div>
        </div>
    );
}

export { PlayListCard };