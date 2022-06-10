import "./VideoList.css";
import { useState, useEffect } from "react";
import { SideBar } from "../index";
import { useVideosData } from "common/context";
import { VideoListCard } from "components";

const VideoListing = () => {
    const { videoData, videoCategoryData } = useVideosData();

    return (
        <main className="main-container grid-2-column dark-container-bg">
            {/* SideBar */}
            <SideBar activeTab={"Home"} />

            <div className="flex-col-container">
                <div className="chips">
                    <span className="chip">
                        All
                    </span>

                    { videoCategoryData.map(category => {
                        return (
                            <span className="chip" key={category._id}>{category.categoryName}</span>
                        );
                    })}
                </div>

                <div className="videos">
                    <div className="video-cards video-grid-3-column">
                        { videoData.map(video => {
                            return <VideoListCard videoData={video} key={video._id} className="zoom" />
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}

export { VideoListing };
