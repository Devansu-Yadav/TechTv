import axios from "axios";

const getPlaylistsData = async (authToken) => {
    try {
        const response = await axios.get("/api/user/playlists", { headers: { authorization: authToken }});
        if(response.status === 200) {
            return response.data;
        }
    } catch(err) {
        console.log("getPlaylistsData: Error in fetching playlist data of the user", err.response.data.errors[0]);
    }
}

const addNewPlayList = async (authToken, playlist, setDisableCreate) => {
    try {
        const response = await axios.post("/api/user/playlists", { playlist: playlist }, { headers: { authorization: authToken }});
        if(response.status === 201) {
            return response.data;
        } 
    } catch (error) {
        console.log("addNewPlayList : Error in adding a new playlist", error.response.data.errors[0]);
        setDisableCreate(false);
    }
}

const removePlayList = async (authToken, playlistId) => {
    try {
        const response = await axios.delete(`/api/user/playlists/${playlistId}`, { headers: { authorization: authToken }});
        if(response.status === 200) {
            return response.data;
        }
    } catch(error) {
        console.log("removePlayList : Error in deleting playlist", error.response.data.errors[0]);
    }
}

const getVideosFromPlaylist = async (authToken, playlistId) => {
    try {
        const response = await axios.get(`/api/user/playlists/${playlistId}`, { headers: { authorization: authToken }});
        if(response.status === 200) {
            return response.data;
        }
    } catch(err) {
        console.log("getVideosFromPlaylist: Error in fetching videos from the specified playlist", err.response.data.errors[0]);
    }
}

const addVideoToPlayList = async (authToken, video, playlistId) => {
    try {
        const response = await axios.post(`/api/user/playlists/${playlistId}`, { video: video }, { headers: { authorization: authToken }});
        if(response.status === 201) {
            return response.data;
        } 
    } catch (error) {
        if(error.response.status === 409) {
            console.log("addVideoToPlayList: Video already in playlist");
            return "Video already in Playlist";
        }
        console.log("addVideoToPlayList : Error in adding a video to the playlist", error.response.data.errors[0]);
    }
}

const removeVideoFromPlayList = async (authToken, playlistId, videoId) => {
    try {
        const response = await axios.delete(`/api/user/playlists/${playlistId}/${videoId}`, { headers: { authorization: authToken }});
        if(response.status === 200) {
            return response.data;
        }
    } catch(error) {
        console.log("removeVideoFromPlayList : Error in deleting video from the playlist", error.response.data.errors[0]);
    }
}

export { getPlaylistsData, addNewPlayList, removePlayList, getVideosFromPlaylist, addVideoToPlayList, removeVideoFromPlayList };