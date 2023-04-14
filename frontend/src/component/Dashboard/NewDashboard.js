import React from 'react';
import { useLocation } from 'react-router';


function NewDashboard() {
    const { videostate } = useLocation();
    console.log(videostate);
    return (
        <>
            <video src={videostate.video_path} controls type="mp4"></video>
        </>
    )
}

export default NewDashboard