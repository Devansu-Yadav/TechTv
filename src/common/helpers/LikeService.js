import axios from "axios";

const getLikedVideosData = async (authToken) => {
    try {
        const response = await axios.get("/api/user/likes", { headers: { authorization: authToken }});
        if(response.status === 200) {
            return response.data;
        }
    } catch(err) {
        console.log("getLikedVideosData: Error in fetching liked videos of the user", err.response.data.errors[0]);
    }
}

const addItemToLikedVideos = async (authToken, video) => {
    try {
        const response = await axios.post("/api/user/likes", { video: video }, { headers: { authorization: authToken }});
        if(response.status === 201) {
            return response.data;
        } 
    } catch (error) {
        console.log("addItemToLikedVideos : Error in adding item to liked videos", error.response.data.errors[0]);
    }
}

const removeItemFromLikedVideos = async (authToken, videoId) => {
    try {
        const response = await axios.delete(`/api/user/likes/${videoId}`, { headers: { authorization: authToken }});
        if(response.status === 200) {
            return response.data;
        }
    } catch(error) {
        console.log("removeItemFromLikedVideos : Error in deleting item from Liked Videos", error.response.data.errors[0]);
    }
}

export { getLikedVideosData, addItemToLikedVideos, removeItemFromLikedVideos };
