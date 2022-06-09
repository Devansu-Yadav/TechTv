import axios from "axios";

const getUserData = async (authToken) => {
    try {
        const response = await axios.get("/api/user/account", { headers: { authorization: authToken }});
        if(response.status === 200) {
            return response.data;
        }
    } catch(err) {
        console.log("getUserData: Error in fetching user account data", err.response.data.errors[0]);
    }
};

export { getUserData };
