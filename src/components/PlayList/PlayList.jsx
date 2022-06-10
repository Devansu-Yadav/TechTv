import "./PlayList.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserData } from "common/context";
import { PlayListCard, SideBar } from "../index";

const PlayList = () => {
    const [showEmptyPlayList, setShowEmptyPlayList] = useState(false);
    const { userData } = useUserData();

    // Show Empty PlayList if videos count is zero
    useEffect(() => {
        !userData.playlists.length ? setShowEmptyPlayList(true): setShowEmptyPlayList(false);
    }, [userData]);

    return (
        <main className="main-container grid-2-column dark-container-bg">
            <SideBar activeTab="Playlist" />

            {/* PlayList Container  */}
            <div className="flex-col-container">
                <div className="playlist-heading flex-col-container">
                    <h1 className="heading-2">
                        {userData.playlists.length} PlayList(s)
                    </h1>
                </div>

                {/* Empty PlayList Div  */}
                { showEmptyPlayList && <div className={`playlist-empty-container ${showEmptyPlayList ? "show": ""} centered-flex-col-container`}>
                    <h3 className="playlist-empty-heading">No Playlists</h3>
                    
                    <Link to="/"><button className="btn btn-outline-primary empty-container-btn rounded-med">Home</button></Link>
                </div> }

                {/* PlayList Cards  */}
                <div className={`playlist-cards ${showEmptyPlayList ? "empty": ""} playlist-grid-3-column`}>
                    { userData.playlists.map(playlist => {
                        return (
                            <Link key={playlist._id} to={`/playlist/${playlist._id}`}>
                                <PlayListCard playListData={playlist} className="zoom" />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export { PlayList };
