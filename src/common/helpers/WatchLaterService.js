import axios from "axios";

const getWatchLaterData = async (authToken) => {
    try {
        const response = await axios.get("/api/user/watchlater", { headers: { authorization: authToken }});
        if(response.status === 200) {
            return response.data;
        }
    } catch(err) {
        console.log("getWatchLaterData: Error in fetching watch later data of the user", err.response.data.errors[0]);
    }
}

const addItemToWatchLater = async (authToken, video) => {
    try {
        const response = await axios.post("/api/user/watchlater", { video: video }, { headers: { authorization: authToken }});
        if(response.status === 201) {
            return response.data;
        } 
    } catch (error) {
        if(error.response.status === 409) {
            console.log("addItemToWatchLater: Video already in Watch Later");
            return "Video already in Watch Later";
        }
        console.log("addItemToWatchLater : Error in adding item to Watch Later", error.response.data.errors[0]);
    }
}

const removeItemFromWatchLater = async (authToken, videoId) => {
    try {
        const response = await axios.delete(`/api/user/watchlater/${videoId}`, { headers: { authorization: authToken }});
        if(response.status === 200) {
            return response.data;
        }
    } catch(error) {
        console.log("removeItemFromWatchLater : Error in deleting item from Watch Later", error.response.data.errors[0]);
    }
}

export { getWatchLaterData, addItemToWatchLater, removeItemFromWatchLater };