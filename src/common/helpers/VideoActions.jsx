// Custom Hook to perform Product Action related to Video like Like, Watch Later, 
// History, Playlist
import { useNavigate } from "react-router-dom";
import { useUserData, useAuth } from "common/context";
import { 
    addItemToLikedVideos,
    removeItemFromLikedVideos,
    addItemToWatchHistory,
    removeItemFromWatchHistory,
    clearWatchHistory,
    addItemToWatchLater,
    removeItemFromWatchLater,
    addNewPlayList,
    removePlayList,
    getVideosFromPlaylist,
    addVideoToPlayList,
    removeVideoFromPlayList
} from "./index";
import { 
    ADD_TO_LIKED_VIDEOS,
    REMOVE_FROM_LIKED_VIDEOS,
    ADD_TO_WATCH_HISTORY,
    REMOVE_FROM_WATCH_HISTORY,
    CLEAR_WATCH_HISTORY,
    ADD_TO_WATCH_LATER,
    REMOVE_FROM_WATCH_LATER,
    ADD_NEW_PLAYLIST,
    REMOVE_PLAYLIST,
    ADD_VIDEO_TO_PLAYLIST,
    REMOVE_VIDEO_FROM_PLAYLIST
} from "common/constants";

const useVideoActions = () => {
    const { userData, userDataDispatch } = useUserData();
    const { userAuthToken } = useAuth();
    const navigate = useNavigate();

    // Check if Item is in Liked Videos or not
    const isVideoInLikedVideos = (videoId) => {
        return userData.liked.find(video => video._id === videoId) ? true: false;
    }

    // Check if video is already in History or not
    const isVideoInWatchHistory = (videoId) => {
        return userData.history.find(video => video._id === videoId) ? true: false;
    }

    // Check if Item is in Watch Later or not
    const isVideoInWatchLater = (videoId) => {
        return userData.watchlater.find(video => video._id === videoId) ? true: false;
    }

    // Check if a playlist is in Playlists or not
    const isPlayListInPlaylists = (playListName) => {
        return userData.playlists.find(playlist => playlist.title === playListName) ? true: false;
    }

    // Check if video is in a playlist or not.
    const isVideoInPlayList = (playListId, videoId) => {
        const playlist = userData.playlists.find(playlist => playlist._id === playListId);
        return playlist.videos.find(video => video._id === videoId) ? true : false;
    }

    // Used to toggle Liked Videos on VideoListing page to add or Remove a video from Liked Videos.
    const toggleLikedVideo = async (event, video) => {
        event.preventDefault();

        if(!userAuthToken) {
            navigate("/login");
        } else {
            const videoInLikedVideo = isVideoInLikedVideos(video._id);
            const likedVideoResponse = !videoInLikedVideo 
            ? await addItemToLikedVideos(userAuthToken, video) : await removeItemFromLikedVideos(userAuthToken, video._id);

            console.log("Updated Liked Videos ", likedVideoResponse.likes);
            userDataDispatch({ 
                type: !videoInLikedVideo ? ADD_TO_LIKED_VIDEOS: REMOVE_FROM_LIKED_VIDEOS, 
                payload: video 
            });
        }
    }

    // For Removing Video from Liked Videos functionality on Liked Videos page
    const removeLikedVideoOnLikedVideosPage = async (event, video) => {
        event.preventDefault();

        if(!userAuthToken) {
            navigate("/login");
        } else if(isVideoInLikedVideos(video._id)) {
            const likedVideoResponse = await removeItemFromLikedVideos(userAuthToken, video._id);
            console.log("Removed video from Liked Videos list!", likedVideoResponse.likes);

            userDataDispatch({
                type: REMOVE_FROM_LIKED_VIDEOS,
                payload: video
            });
        }
    } 

    // Add Video to History on Video Listing page
    const addVideoToWatchHistory = async (video) => {
        if(!userAuthToken) {
            navigate("/login");
        } else {
            const videoInWatchHistory = isVideoInWatchHistory(video._id);
            if(!videoInWatchHistory) {
                const watchHistoryResponse = await addItemToWatchHistory(userAuthToken, video);
                console.log("Watch History API response - ", watchHistoryResponse?.history);

                userDataDispatch({
                    type: ADD_TO_WATCH_HISTORY,
                    payload: video
                });
            }
        }
    }

    // Remove video from Watch History on History page
    const removeVideoFromWatchHistory = async (event, video) => {
        event.preventDefault();

        if(!userAuthToken) {
            navigate("/login");
        } else if(isVideoInWatchHistory(video._id)) {
            const watchHistoryResponse = await removeItemFromWatchHistory(userAuthToken, video._id);
            console.log("Removed video from Watch History", watchHistoryResponse.history);

            userDataDispatch({
                type: REMOVE_FROM_WATCH_HISTORY,
                payload: video
            });
        }
    } 

    // Clear entire Watch History on History page
    const clearVideoWatchHistory = async (event) => {
        event.preventDefault();

        if(!userAuthToken) {
            navigate("/login");
        } else {
            const watchHistoryResponse = await clearWatchHistory(userAuthToken);
            console.log("Cleared entire Watch History", watchHistoryResponse.history);

            userDataDispatch({
                type: CLEAR_WATCH_HISTORY
            });
        }
    }

    // Used to toggle Watch Later on VideoListing page to add or Remove a video from Watch Later.
    const toggleWatchLater = async (event, video) => {
        event.preventDefault();

        if(!userAuthToken) {
            navigate("/login");
        } else {
            const videoInWatchLater = isVideoInWatchLater(video._id);
            const watchLaterResponse = !videoInWatchLater 
            ? await addItemToWatchLater(userAuthToken, video) : await removeItemFromWatchLater(userAuthToken, video._id);

            console.log("Updated Watch Later ", watchLaterResponse.watchlater);
            userDataDispatch({ 
                type: !videoInWatchLater ? ADD_TO_WATCH_LATER: REMOVE_FROM_WATCH_LATER, 
                payload: video 
            });
        }
    }

    // For Removing Video from Watch Later on Watch Later page
    const removeVideoOnWatchLaterPage = async (event, video) => {
        event.preventDefault();

        if(!userAuthToken) {
            navigate("/login");
        } else if(isVideoInWatchLater(video._id)) {
            const watchLaterResponse = await removeItemFromWatchLater(userAuthToken, video._id);
            console.log("Removed video from Liked Videos list!", watchLaterResponse.watchlater);

            userDataDispatch({
                type: REMOVE_FROM_WATCH_LATER,
                payload: video
            });
        }
    } 

    // For creating a new playlist on Video Listing page
    const addNewPlayListOnVideoListingPage = async (event, playlist, setDisableCreate) => {
        event.preventDefault();

        if(!userAuthToken) {
            navigate("/login");
        } else if(!isPlayListInPlaylists(playlist.title)) {
            setDisableCreate(true);
            const playlistResponse = await addNewPlayList(userAuthToken, playlist, setDisableCreate);
            console.log("Added new playlist - ", playlistResponse.playlists);

            userDataDispatch({
                type: ADD_NEW_PLAYLIST,
                payload: playlistResponse.playlists[playlistResponse.playlists.length - 1]
            });
        }
    }

    // For Removing a playlist on Playlists page
    const removePlayListOnPlayListPage = async (event, playlist) => {
        event.preventDefault();

        if(!userAuthToken) {
            navigate("/login");
        } else if(isPlayListInPlaylists(playlist.title)) {
            const playlistResponse = await removePlayList(userAuthToken, playlist._id);
            console.log("Removed playlist from playlists!", playlistResponse.playlists);

            userDataDispatch({
                type: REMOVE_PLAYLIST,
                payload: playlist
            });
        }
    } 

    // Fetch all videos in a Playlist on Single Playlist page
    const getAllVideosInPlayList = async (playlist) => {
        if(!userAuthToken) {
            navigate("/login");
        } else if(isPlayListInPlaylists(playlist.title)) {
            const playListResponse = await getVideosFromPlaylist(userAuthToken, playlist._id);
            console.log("Fetched all videos from the playlist", playListResponse.playlist);

            return playListResponse.playlist;
        }
    }

    // Add/Remove a video to a playlist on Video Listing page
    const toggleVideoToPlayListOnVideoListingPage = async (event, playlist, video) => {
        event.preventDefault();

        if(!userAuthToken) {
            navigate("/login");
        } else if(isPlayListInPlaylists(playlist.title)) {
            const playlistResponse = !isVideoInPlayList(playlist._id, video._id) 
            ? await addVideoToPlayList(userAuthToken, video, playlist._id) 
            : await removeVideoFromPlayList(userAuthToken, playlist._id, video._id);

            console.log("Added a video to playlist - ", playlistResponse.playlist);

            userDataDispatch({
                type: !isVideoInPlayList(playlist._id, video._id) ? ADD_VIDEO_TO_PLAYLIST : REMOVE_VIDEO_FROM_PLAYLIST,
                payload: {
                    video,
                    _id: playlist._id
                }
            });
        }
    }

    // Remove a video from a playlist on Single Playlist page
    const removeVideoOnSinglePlayListPage = async (event, playlist, video) => {
        event.preventDefault();

        if(!userAuthToken) {
            navigate("/login");
        } else if(isPlayListInPlaylists(playlist.title)) {
            const playListResponse = await removeVideoFromPlayList(userAuthToken, playlist._id, video._id);
            console.log("Removed video from playlist", playListResponse.playlists);

            userDataDispatch({
                type: REMOVE_VIDEO_FROM_PLAYLIST,
                payload: {
                    video,
                    _id: playlist._id
                }
            });
        }
    }

    return { 
        isVideoInLikedVideos,
        isVideoInWatchHistory,
        isVideoInWatchLater,
        toggleLikedVideo,
        removeLikedVideoOnLikedVideosPage,
        addVideoToWatchHistory,
        removeVideoFromWatchHistory,
        clearVideoWatchHistory,
        toggleWatchLater,
        removeVideoOnWatchLaterPage,
        addNewPlayListOnVideoListingPage,
        removePlayListOnPlayListPage,
        getAllVideosInPlayList,
        toggleVideoToPlayListOnVideoListingPage,
        removeVideoOnSinglePlayListPage,
        isPlayListInPlaylists,
        isVideoInPlayList
    };
}

export { useVideoActions };