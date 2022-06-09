import { useLoginHandler } from "./Auth/LoginHandler";
import { useLogoutHandler } from "./Auth/LogoutHandler";
import { useSignupHandler } from "./Auth/SignUpHandler";
import { getUserData } from "./AccountService";
import { getLikedVideosData } from "./LikeService";
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

export {
    useLoginHandler,
    useLogoutHandler,
    useSignupHandler,
    getUserData,
    getLikedVideosData,
    getWatchHistoryData,
    getWatchLaterData,
    getPlaylistsData,
    validateOnlyStrings, 
    validateEmail, 
    validatePassword, 
    validateMobileNo, 
    validateAltMobileNo, 
    validatePinCode,
    addressFormValidation
};
