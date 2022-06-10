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

export { getWatchLaterData };