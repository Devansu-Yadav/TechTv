import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const VideoDataContext = createContext({ 
    videoData: [], 
    setVideoData: () => {},
    videoCategoryData: [],
    setVideoCategoryData: () => {},
    getSingleVideoData: () => {},
    videoListModal: false,
    setVideoListModal: () => {},
    currentVideo: {},
    setCurrentVideo: () => {},
    videosSearchQuery: "",
    setVideosSearchQuery: () => {}
});

const useVideosData = () => useContext(VideoDataContext);

const VideoDataProvider = ({ children }) => {
    const [videoData, setVideoData] = useState([]);
    const [videoCategoryData, setVideoCategoryData] = useState([]);
    const [videoListModal, setVideoListModal] = useState(false);
    const [currentVideo, setCurrentVideo] = useState({});
    const [videosSearchQuery, setVideosSearchQuery] = useState("");

    useEffect(() => {
        const getVideosData = async () => {
            try {
                const videosDataResponse = await axios.get("/api/videos");
                if(videosDataResponse.status === 200) {
                    setVideoData(videosDataResponse.data.videos);
                }
            } catch(err) {
                console.log("Error in fetching all videos ", err.response.data);
            }
        }

        const getVideoCategoryData = async () => {
            try {
                const videoCategoryDataResponse = await axios.get("/api/categories");
                if(videoCategoryDataResponse.status === 200) {
                    setVideoCategoryData(videoCategoryDataResponse.data.categories);
                }
            } catch(err) {
                console.log("Error in fetching all categories ", err.response.data);
            }
        }

        getVideosData();
        getVideoCategoryData();
    }, []);

    const getSingleVideoData = async (videoId) => {
        try {
            const videoDataResponse = await axios.get(`/api/user/videos/${videoId}`);
            if(videoDataResponse.status === 200) {
                return videoDataResponse.data;
            }
        } catch(err) {
            console.log(err.response.data.errors[0]);
        }
    };

    return <VideoDataContext.Provider value={{ 
            videoData, 
            setVideoData, 
            videoCategoryData, 
            setVideoCategoryData, 
            getSingleVideoData,
            videoListModal,
            setVideoListModal,
            currentVideo,
            setCurrentVideo,
            videosSearchQuery,
            setVideosSearchQuery
        }}>
        { children }
    </VideoDataContext.Provider>
}

export { useVideosData, VideoDataProvider };
