import React from "react";

function VideoPlayer(props) {
    return (
        <div>
            <video controls width="500" height="500">
                <source src={props.videoUrl} type="video/mp4" />
            </video>
        </div>
    )
}
export default VideoPlayer