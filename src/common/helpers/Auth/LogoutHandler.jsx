import { useUserData, useAuth } from "common/context";
import { USER_LOGOUT } from "common/constants";

const useLogoutHandler = () => {
    const { userDataDispatch, initialUserData } = useUserData();
    const { setIsUserAuthenticated, setUserAuthToken } = useAuth();

    const logoutHandler = () => {
        localStorage.setItem("authToken", "");
        setIsUserAuthenticated(false);
        setUserAuthToken("");
        userDataDispatch({ type: USER_LOGOUT, payload: initialUserData });
    };

    return { logoutHandler };
};

export { useLogoutHandler };
