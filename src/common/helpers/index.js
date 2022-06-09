import { useLoginHandler } from "./Auth/LoginHandler";
import { useLogoutHandler } from "./Auth/LogoutHandler";
import { useSignupHandler } from "./Auth/SignUpHandler";
import { getUserData } from "./AccountService";
import { getLikedVideosData, addItemToLikedVideos, removeItemFromLikedVideos } from "./LikeService";
import { getWatchHistoryData } from "./HistoryService";
import { getWatchLaterData } from "./WatchLaterService";
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
    getWatchLaterData,
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
