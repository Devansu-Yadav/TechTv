import { useAuth, useVideosData, useUserData } from "common/context";
import { useVideoActions } from "common/helpers";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./VideoListModal.css";

const VideoListModal = () => {
    const { videoListModal, setVideoListModal, currentVideo } = useVideosData();
    const { userData } = useUserData();

    const { 
        isVideoInWatchLater, 
        toggleWatchLater, 
        addNewPlayListOnVideoListingPage,
        toggleVideoToPlayListOnVideoListingPage,
        isVideoInPlayList
    } = useVideoActions();
    
    const [newPlaylist, setNewPlaylist] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    const [disableWatchLater, setDisableWatchLater] = useState(false);
    const [disableCheckbox, setDisableCheckbox] = useState(false);
    const [disableCreate, setDisableCreate] = useState(false);
    const navigate = useNavigate();
    const { userAuthToken } = useAuth();

    const createPlaylistHandler = (e) => {
        e.preventDefault();

        addNewPlayListOnVideoListingPage(e, { title: playlistName }, setDisableCreate);
        setNewPlaylist(false);
    };

    const videoInPlaylistHandler = (e, playlist) => {
        toggleVideoToPlayListOnVideoListingPage(e, playlist, currentVideo);

        isVideoInPlayList(playlist._id, currentVideo._id) ? setDisableCheckbox(true): setDisableCheckbox(false);
    }

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

                { userData.playlists && userData.playlists.map((playlist) => (
                        <div key={playlist._id} className="playlist">
                            { console.log(playlist) }
                            <input
                                type="checkbox"
                                id={playlist._id}
                                checked={isVideoInPlayList(playlist._id, currentVideo._id)}
                                className="playlist-checkbox input-checkbox"
                                disabled={disableCheckbox}
                                onChange={(e) => videoInPlaylistHandler(e, playlist)}
                            />
                            <label htmlFor={playlist._id} className="checkbox-label">
                                {playlist.title}
                            </label>
                        </div>
                ))}

                { newPlaylist ? (
                <form onSubmit={(e) => createPlaylistHandler(e)}>
                    <div className="new-playlist-container">
                    <label className="form-name-label" htmlFor="new-playlist-name">Name</label>
                    <input
                        type="text"
                        id="new-playlist-name"
                        placeholder="Enter Playlist Name"
                        className="input-primary input-full-width"
                        onChange={(e) => setPlaylistName(e.target.value.trim())}
                    />
                    <button
                        type="submit"
                        className={`btn btn-primary create-playlist-btn ${
                        playlistName === "" ? "disabled-cursor" : ""
                        }`}
                        disabled={playlistName === "" || disableCreate}
                    >
                        Create
                    </button>
                    </div>
                </form>
                ) : (
                <div
                    className="playlist create-playlist"
                    onClick={() => {
                    if (userAuthToken) setNewPlaylist(true);
                    else {
                        setVideoListModal(false);
                        navigate("/login");
                    }
                    }}
                >
                    <span className="plus-icon">
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                    Create New Playlist
                </div>
                )}
            </div>
        </div>
    );
};

export { VideoListModal };
