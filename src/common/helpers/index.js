import { useLoginHandler } from "./Auth/LoginHandler";
import { useLogoutHandler } from "./Auth/LogoutHandler";
import { useSignupHandler } from "./Auth/SignUpHandler";
import { getUserData } from "./AccountService";
import { getLikedVideosData, addItemToLikedVideos, removeItemFromLikedVideos } from "./LikeService";
import { getWatchHistoryData, addItemToWatchHistory, removeItemFromWatchHistory, clearWatchHistory } from "./HistoryService";
import { getWatchLaterData, addItemToWatchLater, removeItemFromWatchLater } from "./WatchLaterService";
import { getPlaylistsData } from "./PlaylistService";
import {
    validateOnlyStrings, 
    validateEmail, 
    validatePassword, 
    validateMobileNo, 
    validateAltMobileNo, 
    validatePinCode,
    addressFormValidation
} from "./FormValidation";
import { useVideoActions } from "./VideoActions";

export {
    useLoginHandler,
    useLogoutHandler,
    useSignupHandler,
    getUserData,
    getLikedVideosData,
    addItemToLikedVideos,
    removeItemFromLikedVideos,
    getWatchHistoryData,
    addItemToWatchHistory,
    removeItemFromWatchHistory,
    clearWatchHistory,
    getWatchLaterData,
    addItemToWatchLater,
    removeItemFromWatchLater,
    getPlaylistsData,
    validateOnlyStrings, 
    validateEmail, 
    validatePassword, 
    validateMobileNo, 
    validateAltMobileNo, 
    validatePinCode,
    addressFormValidation,
    useVideoActions
};
