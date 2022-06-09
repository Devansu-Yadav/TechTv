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

export { getPlaylistsData };