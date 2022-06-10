import { useReducer, useEffect, useContext, createContext } from "react";
import { 
    USER_LOGIN, 
    USER_LOGOUT,
    SAVE_USER_LIKED_VIDEOS,
    SAVE_USER_WATCH_HISTORY,
    SAVE_USER_WATCH_LATER,
    ADD_TO_WATCH_LATER,
    REMOVE_FROM_WATCH_LATER,
    SAVE_USER_PLAYLISTS,
    ADD_TO_LIKED_VIDEOS,
    REMOVE_FROM_LIKED_VIDEOS,
    ADD_TO_WATCH_HISTORY,
    REMOVE_FROM_WATCH_HISTORY,
    CLEAR_WATCH_HISTORY,
    ADD_NEW_PLAYLIST,
    REMOVE_PLAYLIST,
    ADD_VIDEO_TO_PLAYLIST,
    REMOVE_VIDEO_FROM_PLAYLIST
} from "common/constants";

import { 
    getUserData, 
    getLikedVideosData, 
    getWatchHistoryData, 
    getWatchLaterData, 
    getPlaylistsData, 
    useLogoutHandler 
} from "common/helpers";
import { useAuth } from "common/context";

const UserDataContext = createContext({ 
    userData: {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        liked: [],
        history: [],
        watchlater: [],
        playlists: []
    }, 
    userDataDispatch: () => {}
});

const useUserData = () => useContext(UserDataContext);

const UserDataProvider = ({ children }) => {
    const { userAuthToken } = useAuth();
    const { logoutHandler } = useLogoutHandler();

    const initialUserData = {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        liked: [],
        history: [],
        watchlater: [],
        playlists: []
    }

    const userDataReducer = (state, action) => {
        switch (action.type) {
            case USER_LOGIN:
            case USER_LOGOUT:
                return {
                    ...state,
                    ...action.payload
                }
            case SAVE_USER_LIKED_VIDEOS:
                return {
                    ...state,
                    liked: [...action.payload]
                }
            case ADD_TO_LIKED_VIDEOS:
                return {
                    ...state,
                    liked: [...state.liked, action.payload]
                }
            case REMOVE_FROM_LIKED_VIDEOS:
                return {
                    ...state,
                    liked: [...state.liked.filter(item => item._id !== action.payload._id)]
                }
            case SAVE_USER_WATCH_HISTORY:
                return {
                    ...state,
                    history: [...action.payload]
                }
            case ADD_TO_WATCH_HISTORY:
                return {
                    ...state,
                    history: [...state.history, action.payload]
                }
            case REMOVE_FROM_WATCH_HISTORY:
                return {
                    ...state,
                    history: [...state.history.filter(item => item._id !== action.payload._id)]
                }
            case CLEAR_WATCH_HISTORY:
                return {
                    ...state,
                    history: []
                }
            case SAVE_USER_WATCH_LATER:
                return {
                    ...state,
                    watchlater: [...action.payload]
                }
            case ADD_TO_WATCH_LATER:
                return {
                    ...state,
                    watchlater: [...state.watchlater, action.payload]
                }
            case REMOVE_FROM_WATCH_LATER:
                return {
                    ...state,
                    watchlater: [...state.watchlater.filter(item => item._id !== action.payload._id)]
                }
            case SAVE_USER_PLAYLISTS:
                return {
                    ...state,
                    playlists: [...action.payload]
                }
            case ADD_NEW_PLAYLIST:
                return {
                    ...state,
                    playlists: [...state.playlists, action.payload]
                }
            case REMOVE_PLAYLIST:
                return {
                    ...state,
                    playlists: [...state.playlists.filter(item => item._id !== action.payload._id)]
                }
            case ADD_VIDEO_TO_PLAYLIST:
                return {
                    ...state,
                    playlists: [...state.playlists.reduce((updatedPlayList, currentPlayList) => 
                        currentPlayList._id === action.payload._id ? [...updatedPlayList, {...currentPlayList , videos: currentPlayList.videos.concat([action.payload.video]) }]: 
                        [...updatedPlayList, currentPlayList], [])]
                }
            case REMOVE_VIDEO_FROM_PLAYLIST:
                return {
                    ...state,
                    playlists: [...state.playlists.reduce((updatedPlayList, currentPlayList) => 
                        currentPlayList._id === action.payload._id ? [...updatedPlayList, { ...currentPlayList, videos: currentPlayList.videos.filter(video => video._id !== action.payload.video._id) }]: 
                        [...updatedPlayList, currentPlayList], [])]
                }
            default:
                return {...state}
        }
    }
    
    const [userData, userDataDispatch] = useReducer(userDataReducer, initialUserData);

    // Fetch User account Data along with WishList and Cart initially
    useEffect(() => {
        const saveUserData = async () => {
            if(userAuthToken) {
                try {
                    // Fetch all the user account Data including Addresses
                    const userAccountData = await getUserData(userAuthToken);
                    const { likes } = await getLikedVideosData(userAuthToken);
                    const { history } = await getWatchHistoryData(userAuthToken);
                    const { watchlater } = await getWatchLaterData(userAuthToken);
                    const { playlists } = await getPlaylistsData(userAuthToken);

                    const { _id, firstName, lastName, email, password } = userAccountData.userData;
                    userDataDispatch({ type: USER_LOGIN, payload: { _id, firstName, lastName, email, password }});

                    userDataDispatch({ type: SAVE_USER_LIKED_VIDEOS, payload: likes });
                    userDataDispatch({ type: SAVE_USER_WATCH_HISTORY, payload: history });
                    userDataDispatch({ type: SAVE_USER_WATCH_LATER, payload: watchlater });
                    userDataDispatch({ type: SAVE_USER_PLAYLISTS, payload: playlists });
                } catch (error) {
                    // Log out the User if User Data can't be fetched from saved Auth Token
                    console.log(error);
                    logoutHandler();
                }
            }
        }
        saveUserData();
    }, [userAuthToken]);

    return (
        <UserDataContext.Provider value={{ userData, userDataDispatch, initialUserData }}>
            { children }
        </UserDataContext.Provider>
    );
}

export { useUserData, UserDataProvider };
