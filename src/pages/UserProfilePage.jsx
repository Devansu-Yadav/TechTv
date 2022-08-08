import { useEffect } from "react";
import { NavBar, Footer, UserProfile } from "components";
import "styles/UserProfilePage.css";

const UserProfilePage = () => {
    // Updating title on rendering User Profile Page comp
    useEffect(() => {
        document.title = "TechTv - User Profile";
    }, []);

    return (
        <div>
            <NavBar />
            <UserProfile />
            <Footer />
        </div>
    );
}

export { UserProfilePage };
