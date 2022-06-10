import "./WatchLater.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserData } from "common/context";
import { CommonVideoCard, SideBar } from "../index";

const WatchLater = () => {
    const [showEmptyWatchLater, setShowEmptyWatchLater] = useState(false);
    const { userData } = useUserData();

    // Show Empty Watch Later if videos count is zero
    useEffect(() => {
        !userData.watchlater.length ? setShowEmptyWatchLater(true): setShowEmptyWatchLater(false);
    }, [userData]);

    return (
        <main className="main-container grid-2-column dark-container-bg">
            <SideBar activeTab="Watch-Later" />

            {/* Watch Later Container  */}
            <div className="flex-col-container">
                <div className="watch-later-heading flex-col-container">
                    <h1 className="heading-2">
                        Watch Later
                    </h1>
                    <div className="watch-later-count">{userData.watchlater.length} video(s)</div>
                </div>

                {/* Empty Watch Later Div  */}
                { showEmptyWatchLater && <div className={`watch-later-empty-container ${showEmptyWatchLater ? "show": ""} centered-flex-col-container`}>
                    <h3 className="watch-later-empty-heading">No saved videos</h3>
                    
                    <Link to="/"><button className="btn btn-outline-primary empty-container-btn rounded-med">Home</button></Link>
                </div> }

                {/* Watch Later video Cards  */}
                <div className={`watch-later-cards ${showEmptyWatchLater ? "empty": ""} watch-later-grid-3-column`}>
                    { userData.watchlater.map(video => {
                        return (
                            <CommonVideoCard videoData={video} category="Watch-Later" className="zoom" key={video._id} />
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export { WatchLater };
