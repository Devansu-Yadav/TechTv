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

export { getLikedVideosData };
