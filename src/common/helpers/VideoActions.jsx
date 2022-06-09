// Custom Hook to perform Product Action related to Video like Like, Watch Later, 
// History, Playlist
import { useNavigate } from "react-router-dom";
import { useUserData, useAuth } from "common/context";
import { 
    addItemToLikedVideos,
    removeItemFromLikedVideos
} from "./index";
import { 
    ADD_TO_LIKED_VIDEOS,
    REMOVE_FROM_LIKED_VIDEOS
} from "common/constants";

const useVideoActions = () => {
    const { userData, userDataDispatch } = useUserData();
    const { userAuthToken } = useAuth();
    const navigate = useNavigate();

    // Check if Item is in Liked Videos or not
    const isVideoInLikedVideos = (videoId) => {
        return userData.liked.find(video => video._id === videoId) ? true: false;
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

    return { 
        isVideoInLikedVideos,
        toggleLikedVideo,
        removeLikedVideoOnLikedVideosPage
    };
}

export { useVideoActions };