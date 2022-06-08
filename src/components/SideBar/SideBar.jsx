import "./SideBar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faThumbsUp, faClockRotateLeft, faClock } from "@fortawesome/free-solid-svg-icons";

const SideBar = ({ activeTab }) => {
    return (
        <>
            <aside className="sidebar">
                <nav className="sidebar-nav">
                    <div className="sidebar-tabs-container flex-col-container">
                        <Link className={`sidebar-item centered-flex-row-container ${activeTab === "Home" ? "tab-active": ""}`} to="/">
                            <FontAwesomeIcon icon={faHouse} className="sidebar-icon" />
                            <div className="sidebar-item-txt">Home</div>
                        </Link>

                        <Link className={`sidebar-item centered-flex-row-container ${activeTab === "Playlist" ? "tab-active": ""}`} to="/playlist">
                            <img className="sidebar-icon-img" src="https://res.cloudinary.com/bluekart/image/upload/v1654674372/add-to-playlist-icon_ojjers.png" alt="add to playlist" />
                            <div className="sidebar-item-txt">Playlists</div>
                        </Link>

                        <Link className={`sidebar-item centered-flex-row-container ${activeTab === "Liked" ? "tab-active": ""}`} to="/liked">
                            <FontAwesomeIcon icon={faThumbsUp} className="sidebar-icon" />
                            <div className="sidebar-item-txt">Liked</div>
                        </Link>

                        <Link className={`sidebar-item centered-flex-row-container ${activeTab === "History" ? "tab-active": ""}`} to="/history">
                            <FontAwesomeIcon icon={faClockRotateLeft} className="sidebar-icon" />
                            <div className="sidebar-item-txt">History</div>
                        </Link>

                        <Link className={`sidebar-item centered-flex-row-container ${activeTab === "Watch-Later" ? "tab-active": ""}`} to="/watchlater">
                            <FontAwesomeIcon icon={faClock} className="sidebar-icon" />
                            <div className="sidebar-item-txt">Watch Later</div>
                        </Link>
                    </div>
                </nav>
            </aside>

            <div className="mobile-bottom-nav flex-row-container">
                <Link className="mobile-nav-item centered-flex-col-container" to="/">
                    <FontAwesomeIcon icon={faHouse} className="mobile-nav-icon" />
                    <div className="mobile-nav-item-txt">Home</div>                    
                </Link>

                <Link className="mobile-nav-item centered-flex-col-container" to="/playlist">
                    <img className="mobile-nav-icon-img" src="https://res.cloudinary.com/bluekart/image/upload/v1654674372/add-to-playlist-icon_ojjers.png" alt="add to playlist" />
                    <div className="mobile-nav-item-txt">Playlists</div>                
                </Link>

                <Link className="mobile-nav-item centered-flex-col-container" to="/liked">
                    <FontAwesomeIcon icon={faThumbsUp} className="mobile-nav-icon" />
                    <div className="mobile-nav-item-txt">Liked</div>                    
                </Link>

                <Link className="mobile-nav-item centered-flex-col-container" to="/history">
                    <FontAwesomeIcon icon={faClockRotateLeft} className="mobile-nav-icon" />
                    <div className="mobile-nav-item-txt">History</div>                    
                </Link>

                <Link className="mobile-nav-item centered-flex-col-container" to="/watchlater">
                    <FontAwesomeIcon icon={faClock} className="mobile-nav-icon" />
                    <div className="mobile-nav-item-txt">Watch Later</div>                    
                </Link>
            </div>
        </>
    );
}

export { SideBar };
