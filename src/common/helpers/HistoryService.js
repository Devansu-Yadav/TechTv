import axios from "axios";

const getWatchHistoryData = async (authToken) => {
    try {
        const response = await axios.get("/api/user/history", { headers: { authorization: authToken }});
        if(response.status === 200) {
            return response.data;
        }
    } catch(err) {
        console.log("getWatchHistoryData: Error in fetching watch history of the user", err.response.data.errors[0]);
    }
}

const addItemToWatchHistory = async (authToken, video) => {
    try {
        const response = await axios.post("/api/user/history", { video: video }, { headers: { authorization: authToken }});
        if(response.status === 201) {
            return response.data;
        } 
    } catch (error) {
        if(error.response.status === 409) {
            console.log("addItemToWatchHistory: Video already in History");
            return "Video already in Watch History";
        }
        console.log("addItemToWatchHistory : Error in adding item to Watch History", error.response.data.errors[0]);
    }
}

const removeItemFromWatchHistory = async (authToken, videoId) => {
    try {
        const response = await axios.delete(`/api/user/history/${videoId}`, { headers: { authorization: authToken }});
        if(response.status === 200) {
            return response.data;
        }
    } catch(error) {
        console.log("removeItemFromWatchHistory : Error in removing video from Watch History", error.response.data.errors[0]);
    }
}

const clearWatchHistory = async (authToken) => {
    try {
        const response = await axios.delete(`/api/user/history/all`, { headers: { authorization: authToken }});
        if(response.status === 200) {
            return response.data;
        }
    } catch(error) {
        console.log("clearWatchHistory : Error in clearing Watch History", error.response.data.errors[0]);
    }
}

export { getWatchHistoryData, addItemToWatchHistory, removeItemFromWatchHistory, clearWatchHistory };