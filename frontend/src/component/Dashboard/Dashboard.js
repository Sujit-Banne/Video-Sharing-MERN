import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './Dashboard.css';
import VideoPlayer from '../VideoPlayer/videoPlayer';

function Dashboard() {
    const navigate = useNavigate();
    const [videoList, setVideoList] = useState([]);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAllVideos, setShowAllVideos] = useState(false);
    const [showMore, setShowMore] = useState(false);


    useEffect(() => {
        const tokenTime = JSON.parse(localStorage.getItem('userTokenTime'));
        if (tokenTime) {
            axios
                .get('http://localhost:5050/api/videolist', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + tokenTime.token,
                    },
                })
                .then((res) => {
                    setVideoList(res.data);
                })
                .catch((err) => {
                    console.log(err);
                    navigate('/signin');
                });
        } else {
            navigate('/signin');
        }
    }, [navigate]);

    const handleThumbnailClick = (videoUrl, videoId) => {
        setSelectedVideoUrl(videoUrl);
        setSelectedVideoId(videoId);
    };

    const handleCloseClick = () => {
        setSelectedVideoUrl(null);
        setSelectedVideoId(null);
    };
    // Add this function to update the search query state
    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);
    };

    const filteredVideoList = videoList.filter((video) => {
        return video.upload_title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    const randomIndex = Math.floor(Math.random() * videoList.length);

    const videos = filteredVideoList
        .slice(0, showAllVideos ? filteredVideoList.length : 50) // show 50 videos by default or all if toggle is clicked
        .map((video) => {
            return (
                <>
                    <div
                        className="video"
                        key={video._id}
                        onClick={() => handleThumbnailClick(video.video_path, video._id)}
                    >
                        <div className="video-thumbnail">
                            {/* <img src={video.thumbnail_path} alt="video thubmnail" key={video._id} target="_blank" /> */}
                            <img src={video.thumbnail_path} alt="video thubmnail" key={video._id}
                                onClick={() => {
                                    navigate(`/profile/${video._id}`, { state: video })
                                }} />
                        </div>
                        <span className="username">
                            {video.uploader_name}
                        </span>
                        <span className="video-title">
                            {video.upload_title.replace(/_/g, ' ')}
                        </span>
                    </div>
                </>
            );
        });

    return (
        <>
            <Navbar onSearchQueryChange={handleSearchQueryChange} />
            <div className="container ">
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

                <div className="d-flex justify-content-between">
                    <h4 className="mb-0">Recent</h4>
                    <button className="toggle-button" onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'View Less' : 'View All'}
                    </button>
                </div>
                {selectedVideoUrl ? (
                    <div className="selected-video">
                        <VideoPlayer videoUrl={selectedVideoUrl} />
                        <div className="button-group">
                            <button className="close-button" onClick={handleCloseClick}>
                                Close
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="streams row">
                            {videos.slice(0, showMore ? videos.length : 4)}
                        </div>
                    </>
                )}
            </div>
        </>
    );

}
export default Dashboard


