import { useEffect } from "react";
import { NavBar, Footer, PlayList } from "components";
import "styles/PlayListPage.css";

const PlayListPage = () => {
    // Updating title on rendering PlayList Page comp
    useEffect(() => {
        document.title = "TechTv - PlayList Page";
    }, []);

    return (
        <div>
            <NavBar />
            <PlayList />
            <Footer />
        </div>
    );
}

export { PlayListPage };
