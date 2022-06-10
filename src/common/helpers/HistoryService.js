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

export { getWatchHistoryData };