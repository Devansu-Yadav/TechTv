import { useEffect } from "react";
import { NavBar, Footer, WatchLater } from "components";
import "styles/WatchLaterPage.css";

const WatchLaterPage = () => {
    // Updating title on rendering Watch Later Page comp
    useEffect(() => {
        document.title = "TechTv - Watch Later";
    }, []);

    return (
        <div>
            <NavBar />
            <WatchLater />
            <Footer />
        </div>
    );
}

export { WatchLaterPage };
