import { useState, useEffect } from "react";
import { useVideosData } from "common/context";

const useSearchVideos = () => {
    const { videoData, videosSearchQuery } = useVideosData();

    const queryVal = new URLSearchParams(videosSearchQuery).get("query");
    const [searchedVideos, setSearchedVideos] = useState([]);

    const getSearchedVideos = () => {
        let searchedVideos = [];
        searchedVideos = videoData.filter((video) => 
            video.title.toLowerCase().includes(queryVal.toLowerCase()) || 
            video.categoryName.toLowerCase().includes(queryVal.toLowerCase())
        );
        setSearchedVideos(searchedVideos);
    };

    useEffect(() => {
        setSearchedVideos(videoData);
    }, [videoData]);

    useEffect(() => {
        if(videosSearchQuery.length > 0) {
            getSearchedVideos();
        } else {
            setSearchedVideos(videoData);
        }
    }, [videosSearchQuery, videoData]);

    return { searchedVideos };
}

export { useSearchVideos };