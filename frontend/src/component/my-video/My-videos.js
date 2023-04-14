import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './My-video.css';

const MyVideos = ({ uploader_name }) => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('userTokenTime')); // get the authorization token
                if (!token) {
                    throw new Error('No token found');
                }
                const response = await axios.get(`http://localhost:5050/api/user_upload/${localStorage.getItem('uploader_name')}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setVideos(response.data.contacts);
                console.log(response);
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError('An error occurred. Please try again later.');
                }
            }
        };
        fetchVideos();
    }, [uploader_name]);

    const handleThumbnailClick = (video) => {
        setSelectedVideo(video);
    };
    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);
    };
    const filteredVideos = videos.filter((video) => {
        return video.upload_title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleDeleteClick = async (videoId) => {
        try {
            const token = JSON.parse(localStorage.getItem('userTokenTime')); // get the authorization token
            if (!token) {
                throw new Error('No token found');
            }
            await axios.delete(`http://localhost:5050/api/videos/${videoId}`, {
                headers: { Authorization: `Bearer ${token.token}` }
            });
            // Remove the deleted video from the video list
            setVideos((prevVideos) =>
                prevVideos.filter((video) => video._id !== videoId)
            );

            // Clear the selected video if the deleted video is the currently selected one
            if (selectedVideo && selectedVideo._id === videoId) {
                setSelectedVideo(null);
            }
        } catch (err) {
            console.log(err);
        }
    };

    {
        filteredVideos.map((video) => (
            <div key={video._id}>
                <div className="video-thumbnail" onClick={() => handleThumbnailClick(video)}>
                    <img src={video.thumbnail_path} alt="video thumbnail" className="iconimg" key={video._id} />
                </div>
                <h2 className="heading">{video.upload_title}</h2>
            </div>
        ))
    }

    return (
        <div>
            <Navbar onSearchQueryChange={handleSearchQueryChange} />

            <div className="video-grid">
                <div className="video-grid1">
                    {filteredVideos.map((video) => (
                        <div key={video._id}>
                            <div className="video-thumbnail" onClick={() => handleThumbnailClick(video)}>
                                <img src={video.thumbnail_path} alt="video thumbnail" className="iconimg" key={video._id} />
                            </div>
                            <h2 className="heading">{video.upload_title}</h2>
                        </div>
                    ))}

                </div>
                <div className="video-grid2">
                    {selectedVideo && (
                        <div>
                            <video src={selectedVideo.video_path} controls />
                            <div className="video-info">
                                <h1 className="head">{selectedVideo.upload_title}</h1>
                                <h2 className='d'>Description</h2>
                                <p className='des'> {selectedVideo.video_description} </p>
                                <button onClick={() => handleDeleteClick(selectedVideo._id)} className='delete'>Delete</button>

                                <button className='save'>Save</button>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyVideos;
