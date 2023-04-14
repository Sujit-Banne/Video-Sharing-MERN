//crousel
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ExistingPage.css'
import LOGO from '../logo.PNG'
function VideoGallery() {
    const navigate = useNavigate();
    const [videoList, setVideoList] = useState([]);
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAllVideos, setShowAllVideos] = useState(false);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [showThumbnails, setShowThumbnails] = useState(true);


    const handleThumbnailClick = (videoId) => {
        const selectedVideo = videoList.find(video => video._id === videoId);
        const filteredVideos = videoList.filter(video => video._id !== videoId);
        const randomVideos = filteredVideos.sort(() => 0.5 - Math.random()).slice(0, 3);
        setSelectedVideoId(selectedVideo.video_path);
        setRelatedVideos(randomVideos);
        setShowThumbnails(false);

    };


    // Make API request to fetch video data
    useEffect(() => {
        fetch('http://localhost:5050/api/existingvideo')
            .then((response) => response.json())
            .then((data) => {
                setVideoList(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const filteredVideoList = videoList.filter((video) => {
        return video.upload_title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    const videos = filteredVideoList.map((video) => {
        return (<>
            <div
                className="video-container"
                key={video._id}
                onClick={() => handleThumbnailClick(video._id)}
            >
                <div className="video-thumbnail">
                    <img src={video.thumbnail_path} alt="video thubmnail" key={video._id}
                        onClick={() => {
                            navigate(`/profile/${video._id}`, { state: video })
                        }} />
                </div>
                <div className="video-details">
                    <span className="username">
                        {video.uploader_name}
                    </span>
                    <span className="video-title">
                        {video.upload_title.replace(/_/g, ' ')}
                    </span>
                </div>
            </div>
        </>
        );
    });

    const toggleViewAll = () => {
        setShowAllVideos(!showAllVideos);
    };

    const displayedVideos = showAllVideos ? videos : videos.slice(0, 3);
    const randomIndex = Math.floor(Math.random() * videoList.length);

    return (
        <>
            <div className="navbar">
                <img src={LOGO} alt="logo" className="logo" />
                <div className="search-bar">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by video title"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div>
                    <button className="login" onClick={() => navigate("/signin")}>
                        Login
                    </button>
                    <span className="navbar-separator">|</span>
                    <button className="register-signup" onClick={() => navigate("/signup")}>
                        Register
                    </button>
                </div>
            </div>

            <div className="carousel">
                {videoList.length > 0 && (
                    <div
                        className="carousel-thumbnail"
                        onClick={() => handleThumbnailClick(videoList[randomIndex]._id)}
                    >
                        <img src={videoList[randomIndex].thumbnail_path} alt="carousel thumbnail" />
                        <div className="carousel-details">
                            <span className="username">{videoList[randomIndex].uploader_name}</span>
                            <span className="carousel-title">{videoList[randomIndex].upload_title.replace(/_/g, " ")}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="container">
                <h4 className="togglebar">
                    Recent
                    {filteredVideoList.length >= 4 && (
                        <button className="toggle-button" onClick={toggleViewAll}>
                            {showAllVideos ? "View Less" : "View All"}
                        </button>
                    )}
                </h4>

                <div className="videos-container">
                    {displayedVideos}
                </div>
            </div>
        </>
    );
}
export default VideoGallery



