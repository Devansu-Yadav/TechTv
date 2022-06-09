import "./LikedVideos.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserData } from "common/context";
import { CommonVideoCard, SideBar } from "../index";

const LikedVideos = () => {
    const [showEmptyLikedVideos, setShowEmptyLikedVideos] = useState(false);
    const { userData } = useUserData();

    // Show Empty Liked Videos list if videos count is zero
    useEffect(() => {
        !userData.liked.length ? setShowEmptyLikedVideos(true): setShowEmptyLikedVideos(false);
    }, [userData]);

    return (
        <main className="main-container grid-2-column dark-container-bg">
            <SideBar activeTab="Liked" />

            {/* Liked Videos Container  */}
            <div className="flex-col-container">
                <div className="liked-videos-heading flex-col-container">
                    <h1 className="heading-2">
                        Liked Videos
                    </h1>
                    <div className="liked-videos-count">{userData.liked.length} video(s)</div>
                </div>

                {/* Empty Liked Videos Div  */}
                { showEmptyLikedVideos && <div className={`liked-videos-empty-container ${showEmptyLikedVideos ? "show": ""} centered-flex-col-container`}>
                    <h3 className="liked-videos-empty-heading">No Liked Videos</h3>
                    
                    <Link to="/"><button className="btn btn-outline-primary empty-container-btn rounded-med">Home</button></Link>
                </div> }

                {/* Liked Video Cards  */}
                <div className={`liked-video-cards ${showEmptyLikedVideos ? "empty": ""} liked-video-grid-3-column`}>
                    { userData.liked.map(video => {
                        return (
                            <CommonVideoCard videoData={video} category="Liked" className="zoom" key={video._id} />
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export { LikedVideos };
