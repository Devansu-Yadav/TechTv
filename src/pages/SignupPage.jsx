import { useEffect } from "react";
import { NavBar, Footer, SignupForm } from "components";
import "styles/SignupPage.css";

const SignUpPage = () => {
    // Updating title on rendering Signup Page comp
    useEffect(() => {
        document.title = "TechTv - Signup";
    }, []);

    return (
        <div>
            <NavBar linkActive="signup" />
            <SignupForm />
            <Footer />
        </div>
    );
}

export { SignUpPage };
