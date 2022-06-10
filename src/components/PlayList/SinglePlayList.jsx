import "./SinglePlayList.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CommonVideoCard, SideBar } from "../index";
import { useUserData } from "common/context";

const SinglePlayList = () => {
    const [showEmptyPlayListVideos, setShowEmptyPlayListVideos] = useState(false);
    const { userData } = useUserData();
    const { playlistId } = useParams();
    const playList = userData.playlists.find(playList => playList._id === playlistId);

    // Show Empty PlayList if videos count is zero
    useEffect(() => {
        !playList.videos.length ? setShowEmptyPlayListVideos(true): setShowEmptyPlayListVideos(false);
    }, [userData]);

    return (
        <main className="main-container grid-2-column dark-container-bg">
            <SideBar activeTab="Playlist" />

            {/* Single playlist Container  */}
            <div className="flex-col-container">
                <div className="single-playlist-heading flex-col-container">
                    <h1 className="heading-2">
                        {playList.title}
                    </h1>
                    <div className="playlist-count">{playList.videos.length} video(s)</div>
                </div>

                {/* Empty PlayList Div  */}
                { showEmptyPlayListVideos && <div className={`single-playlist-empty-container ${showEmptyPlayListVideos ? "show": ""} centered-flex-col-container`}>
                    <h3 className="single-playlist-empty-heading">No videos saved in playlist!</h3>
                    
                    <Link to="/"><button className="btn btn-outline-primary empty-container-btn rounded-med">Home</button></Link>
                </div> }

                {/* PlayList video Cards  */}
                <div className={`single-playlist-cards ${showEmptyPlayListVideos ? "empty": ""} single-playlist-grid-3-column`}>
                    { playList.videos.map(video => {
                        return (
                            <CommonVideoCard playListData={playList} videoData={video} category="Playlist" className="zoom" key={video._id} />
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export { SinglePlayList };
