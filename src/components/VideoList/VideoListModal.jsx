import { useAuth, useVideosData } from "common/context";
import { useVideoActions } from "common/helpers";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./VideoListModal.css";

const VideoListModal = () => {
    const { videoListModal, setVideoListModal, currentVideo } = useVideosData();
    const { isVideoInWatchLater, toggleWatchLater } = useVideoActions();

    const [newPlaylist, setNewPlaylist] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    const [disableWatchLater, setDisableWatchLater] = useState(false);
    const [disableCheckbox, setDisableCheckbox] = useState(false);
    const [disableCreate, setDisableCreate] = useState(false);
    const navigate = useNavigate();
    const { userAuthToken } = useAuth();

    return (
        <div className={`modal-wrapper ${videoListModal ? "show" : ""}`}>
            <div className="videoList-modal">
                <div className="videoList-modal-header flex-row-container">
                    <div className="videoList-modal-heading flex-col-container">
                        <div>Save to...</div>
                    </div>
                    <FontAwesomeIcon
                        icon={faXmark}
                        className="videoList-modal-close-btn"
                        onClick={() => {
                            setNewPlaylist(false);
                            setVideoListModal(false);
                        }}
                    />
                </div>

                <div className="videoList-modal-container flex-row-container">
                    <>
                        <input
                            type="checkbox"
                            id="watchLater"
                            checked={isVideoInWatchLater(currentVideo._id)}
                            className="watchlater-checkbox input-checkbox"
                            disabled={disableWatchLater}
                            onChange={(e) => {
                                toggleWatchLater(e, currentVideo);
                                isVideoInWatchLater(currentVideo._id)
                                    ? setDisableWatchLater(true)
                                    : setDisableWatchLater(false)
                            }}
                        />
                        <label htmlFor="watchLater" className="checkbox-label">
                            Watch Later
                        </label>
                    </>
                </div>
            </div>
        </div>
    );
};

export { VideoListModal };
