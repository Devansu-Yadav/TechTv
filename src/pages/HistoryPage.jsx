import { useEffect } from "react";
import { NavBar, Footer, History } from "components";
import "styles/HistoryPage.css";

const WatchHistoryPage = () => {
    // Updating title on rendering History Page comp
    useEffect(() => {
        document.title = "TechTv - Watch History";
    }, []);

    return (
        <div>
            <NavBar />
            <History />
            <Footer />
        </div>
    );
}

export { WatchHistoryPage };
