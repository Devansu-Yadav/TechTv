import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useFormError, useAuth, useUserData } from "common/context";
import {  
    getLikedVideosData, 
    getWatchHistoryData, 
    getWatchLaterData, 
    getPlaylistsData, 
} from "common/helpers";
import { USER_LOGIN } from "common/constants";

const useLoginHandler = () => {
    const initialFormState = {
        email: "",
        password: ""
    }

    const navigate = useNavigate();
    const [loginFormData, setLoginFormData] = useState(initialFormState);
    const { setIsFormError, setFormDataErr } = useFormError();
    const { setIsUserAuthenticated, setUserAuthToken } = useAuth();
    const { userDataDispatch } = useUserData();

    const loginHandler = async (event, loginFormData) => {
        event.preventDefault();
        try {
            const loginResponse = await axios.post("/api/auth/login", loginFormData);
            console.log(loginResponse);
            if(loginResponse.status === 200) {
                const { foundUser, encodedToken } = loginResponse.data;
                navigate("/");
                localStorage.setItem("authToken", encodedToken);
                setUserAuthToken(encodedToken);
                setIsUserAuthenticated(true);
                
                // Reset Form Errors on succesful login
                setIsFormError(false);
                setFormDataErr("");

                const { likes } = await getLikedVideosData(encodedToken);
                const { history } = await getWatchHistoryData(encodedToken);
                const { watchlater } = await getWatchLaterData(encodedToken);
                const { playlists } = await getPlaylistsData(encodedToken);

                userDataDispatch({ type: USER_LOGIN, payload: {...foundUser, liked: likes, history, watchlater, playlists }});
            }
        } catch(err) {
            console.log("loginHandler: Error in Login", err.response.data.errors[0]);
            setIsFormError(true);
            setFormDataErr(err.response.data.errors[0]);
        }
    }

    const loginAsGuestHandler = async (event) => {
        setLoginFormData(loginData => ({...loginData, email: "johnraodoekar@gmail.com", password: "johnraoDoekar@123" }));
        await loginHandler(event, { email: "johnraodoekar@gmail.com", password: "johnraoDoekar@123" });
    }

    return { loginHandler, loginAsGuestHandler, loginFormData, setLoginFormData };
}

export { useLoginHandler };