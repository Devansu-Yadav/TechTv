// Custom Hook to perform Product Action related to Video like Like, Watch Later, 
// History, Playlist
import { useNavigate } from "react-router-dom";
import { useUserData, useAuth } from "common/context";
import { 
    addItemToLikedVideos,
    removeItemFromLikedVideos,
    addItemToWatchHistory,
    removeItemFromWatchHistory,
    clearWatchHistory
} from "./index";
import { 
    ADD_TO_LIKED_VIDEOS,
    REMOVE_FROM_LIKED_VIDEOS,
    ADD_TO_WATCH_HISTORY,
    REMOVE_FROM_WATCH_HISTORY,
    CLEAR_WATCH_HISTORY
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

    return { 
        isVideoInLikedVideos,
        toggleLikedVideo,
        removeLikedVideoOnLikedVideosPage,
        addVideoToWatchHistory,
        removeVideoFromWatchHistory,
        clearVideoWatchHistory
    };
}

export { useVideoActions };