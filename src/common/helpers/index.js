import { useLoginHandler } from "./Auth/LoginHandler";
import { useLogoutHandler } from "./Auth/LogoutHandler";
import { useSignupHandler } from "./Auth/SignUpHandler";
import { getUserData } from "./AccountService";
import { getLikedVideosData, addItemToLikedVideos, removeItemFromLikedVideos } from "./LikeService";
import { getWatchHistoryData, addItemToWatchHistory, removeItemFromWatchHistory, clearWatchHistory } from "./HistoryService";
import { getWatchLaterData, addItemToWatchLater, removeItemFromWatchLater } from "./WatchLaterService";
import { 
    getPlaylistsData, 
    getVideosFromPlaylist, 
    addNewPlayList,
    removePlayList,
    addVideoToPlayList,
    removeVideoFromPlayList,
} from "./PlaylistService";
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
import { useSearchVideos } from "./SearchVideosHandler";

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
    getVideosFromPlaylist,
    addNewPlayList,
    removePlayList,
    addVideoToPlayList,
    removeVideoFromPlayList,
    validateOnlyStrings, 
    validateEmail, 
    validatePassword, 
    validateMobileNo, 
    validateAltMobileNo, 
    validatePinCode,
    addressFormValidation,
    useVideoActions,
    useSearchVideos
};
