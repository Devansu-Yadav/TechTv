import { useEffect } from "react";
import { NavBar, Footer, SideBar, LoginForm } from "components";
import "styles/LoginPage.css";

const LoginPage = () => {
    // Updating title on rendering Login Page comp
    useEffect(() => {
        document.title = "TechTv - Login";
    }, []);

    return (
        <div>
            <NavBar linkActive="login" />
            <LoginForm />
            <Footer />
        </div>
    );
}

export { LoginPage };
