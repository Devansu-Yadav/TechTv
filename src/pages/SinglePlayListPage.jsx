import { useEffect } from "react";
import { NavBar, Footer, SinglePlayList } from "components";
import "styles/SinglePlayListPage.css";

const SinglePlayListPage = () => {
    // Updating title on rendering Single PlayList Page comp
    useEffect(() => {
        document.title = "TechTv - Single PlayList page";
    }, []);

    return (
        <div>
            <NavBar />
            <SinglePlayList />
            <Footer />
        </div>
    );
}

export { SinglePlayListPage };
