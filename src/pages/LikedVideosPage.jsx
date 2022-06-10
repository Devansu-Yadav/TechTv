import { useEffect } from "react";
import { NavBar, Footer, LikedVideos } from "components";
import "styles/LikedVideosPage.css";

const LikedVideosPage = () => {
    // Updating title on rendering Liked Videos Page comp
    useEffect(() => {
        document.title = "TechTv - Liked Videos";
    }, []);

    return (
        <div>
            <NavBar />
            <LikedVideos />
            <Footer />
        </div>
    );
}

export { LikedVideosPage };
