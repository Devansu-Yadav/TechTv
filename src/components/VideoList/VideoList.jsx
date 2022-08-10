import "./VideoList.css";
import { useState, useEffect } from "react";
import { SideBar } from "../index";
import { useVideosData } from "common/context";
import { useSearchVideos } from "common/helpers";
import { VideoListCard } from "components";
import { useLocation } from "react-router-dom";

const VideoListing = () => {
    const { videoData, videoCategoryData } = useVideosData();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { setVideosSearchQuery } = useVideosData();

    const { search } = useLocation();
    const queryVal = new URLSearchParams(search).get("query");
    const { searchedVideos } = useSearchVideos();

    const getFilteredVideos = () => {
        let filteredVideos = [];

        if(selectedCategory === "All") {
            filteredVideos = videoData;
        } else {
            filteredVideos = videoData.filter((video) => video.categoryName === selectedCategory);
        }
        return filteredVideos;
    };

    // Set user's search query
    useEffect(() => {
        setVideosSearchQuery(search);
    }, [search]);

    return (
        <main className="main-container grid-2-column dark-container-bg">
            {/* SideBar */}
            <SideBar activeTab={"Home"} />

            <div className="flex-col-container">
                { !search && (
                    <>
                        <div className="chips">
                            <span className={`chip ${ selectedCategory === "All" ? "active-category-chip": ""}`}
                            onClick={() => setSelectedCategory("All")}>
                                All
                            </span>

                            { videoCategoryData.map(category => {
                                return (
                                    <span className={`chip ${category.categoryName === selectedCategory ? "active-category-chip": ""}`} key={category._id}
                                    onClick={() => setSelectedCategory(category.categoryName)}>{category.categoryName}</span>
                                );
                            })}
                        </div>

                        <div className="videos">
                            <div className="video-cards video-grid-3-column">
                                { getFilteredVideos().map(video => {
                                    return <VideoListCard videoData={video} key={video._id} className="zoom" />
                                })}
                            </div>
                        </div>
                    </>
                )}

                { search && searchedVideos.length > 0 && (
                    <>
                        <div className="centered-flex-col-container search-header">
                            {`Search Results for "${queryVal}" - ${searchedVideos.length} videos`}
                        </div>

                        <div className="videos">
                            <div className="video-cards video-grid-3-column">
                                { searchedVideos.map(video => {
                                    return <VideoListCard videoData={video} key={video._id} className="zoom" />
                                })}
                            </div>
                        </div>
                    </>
                )}

                { search && !searchedVideos.length && (
                    <div className="videoList-empty-container centered-flex-col-container">
                        <h3 className="videoList-empty-heading">No Search Results found for {queryVal}</h3>
                        <img className="videoList-empty-img" src="https://res.cloudinary.com/bluekart/image/upload/v1660134624/empty-productlist_wdvsyv.svg" alt="Video Not found" />
                    </div>
                )}
            </div>
        </main>
    );
}

export { VideoListing };
