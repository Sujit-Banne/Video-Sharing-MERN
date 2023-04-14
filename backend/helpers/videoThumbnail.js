const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 4000;
const ffmpegPath = 'C:/PATH_Programs/ffmpeg.exe';
const width = 256;
const height = 144;

const VideoDetails = require('../models/VideoDetails')

const generateThumbnail = (target, title, username, video_description) => {
    // Remove file extensions from the title
    title = title.replace(/\.(mov|mpg|mpeg|mp4|wmv|avi)$/gi, '');
    const thumbnailPath = path.join(__dirname, '..', 'media', 'uploads', 'video_thumbnails', `${title}.jpg`);

    // Ensure the parent directory of the thumbnail file exists
    fs.mkdirSync(path.dirname(thumbnailPath), { recursive: true });

    const tmpFile = fs.createWriteStream(thumbnailPath);
    const ffmpeg = spawn(ffmpegPath, [
        '-ss',
        '0',
        '-i',
        target,
        '-vf',
        `thumbnail,scale=${width}:${height}`,
        '-qscale:v',
        '2',
        '-frames:v',
        '1',
        '-f',
        'image2',
        '-c:v',
        'mjpeg',
        'pipe:1'
    ]);
    ffmpeg.stdout.pipe(tmpFile);

    const videoDetails = new VideoDetails({
        uploader_name: username,
        upload_title: title,
        video_path: target,
        video_description: video_description,
        thumbnail_path: `http://localhost:${PORT}/api/videos/video_thumbnails/${encodeURIComponent(title)}.jpg`
    });
    videoDetails.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    generateThumbnail
};
