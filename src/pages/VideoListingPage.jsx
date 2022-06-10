import { useEffect } from "react";
import { NavBar, VideoListing, Footer, VideoListModal } from "components";
import "styles/VideoListingPage.css";

const VideoListingPage = () => {
    // Updating title on rendering Video Listing Page comp
    useEffect(() => {
        document.title = "TechTv - Videos";
    }, []);

    return (
        <>
            <NavBar />
            <VideoListModal />
            <VideoListing />
            <Footer />
        </>
    );
}

export { VideoListingPage };
