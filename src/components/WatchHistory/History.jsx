import "./History.css";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useUserData } from "common/context";
import { CommonVideoCard, SideBar } from "../index";
import { useVideoActions } from "common/helpers";

const History = () => {
    const [showEmptyHistory, setShowEmptyHistory] = useState(false);
    const { clearVideoWatchHistory } = useVideoActions();
    const { userData } = useUserData();
    const historyCardContainerRef = useRef(null);

    // Show Empty History if videos count is zero
    useEffect(() => {
        !userData.history.length ? setShowEmptyHistory(true): setShowEmptyHistory(false);
    }, [userData]);

    const clearHistoryHandler = (event) => {
        clearVideoWatchHistory(event);
        historyCardContainerRef.current.classList.add("history-card-container-display-none");
    }

    return (
        <main className="main-container grid-2-column dark-container-bg">
            <SideBar activeTab="History" />

            {/* Watch History Container  */}
            <div className="flex-col-container">
                <div className="watch-history-header flex-row-container">
                    <div className="watch-history-heading flex-col-container">
                        <h1 className="heading-2">
                            History
                        </h1>
                        <div className="watch-history-count">{userData.history.length} video(s)</div>
                    </div>
                    { userData.history.length && <button className="btn-link btn-link-primary clear-history-btn space-S" onClick={(event) => clearHistoryHandler(event) }>Clear History</button> }
                </div>

                {/* Empty Liked Videos Div  */}
                { showEmptyHistory && <div className={`watch-history-empty-container ${showEmptyHistory ? "show": ""} centered-flex-col-container`}>
                    <h3 className="watch-history-empty-heading">No videos watched</h3>
                    
                    <Link to="/"><button className="btn btn-outline-primary empty-container-btn rounded-med">Home</button></Link>
                </div> }

                {/* Liked Video Cards  */}
                <div ref={historyCardContainerRef} className={`watch-history-cards ${showEmptyHistory ? "empty": ""} watch-history-grid-3-column`}>
                    { userData.history.map(video => {
                        return (
                            <CommonVideoCard videoData={video} category="History" className="zoom" key={video._id} />
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export { History };
