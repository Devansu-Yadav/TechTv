import { useState, useEffect, useContext, createContext } from "react";

const AuthenticationContext = createContext({ 
    isUserAuthenticated: false, 
    setIsUserAuthenticated: () => {},
    userAuthToken: "",
    setUserAuthToken: () => {}
});

const useAuth = () => useContext(AuthenticationContext);

const AuthenticationProvider = ({ children }) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [userAuthToken, setUserAuthToken] = useState("");

    // To keep user logged in even after refreshing page
    useEffect(() => {
        const localStorageAuth = localStorage.getItem("authToken");
        if (localStorageAuth) {
            setUserAuthToken(localStorageAuth);
            setIsUserAuthenticated(true);
        }
    }, []);

    return (
    <AuthenticationContext.Provider value={{ isUserAuthenticated, setIsUserAuthenticated, userAuthToken, setUserAuthToken }}>
        {children}
    </AuthenticationContext.Provider>
    );
}

export { useAuth, AuthenticationProvider };
