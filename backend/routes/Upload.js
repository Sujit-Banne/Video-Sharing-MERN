const express = require('express');
const router = express.Router();
const multer = require('multer');

const dotenv = require('dotenv')
require('dotenv').config()
const PORT = process.env.PORT || 4000

const thumbnailGenerator = require('../helpers/videoThumbnail')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.replace(/ /g, '_'));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 50    // 50 MB
    }
});

router.post('/api/upload', upload.single('file'), (req, res, next) => {
    try {
        // You can access the value of the video_description field like this:
        console.log(req.body);
        thumbnailGenerator.generateThumbnail(
            // /api/videos is made publically available in App.js
            'http://localhost:' + PORT + '/api/videos/' + req.file.filename.replace(/ /g, '_'),
            req.file.filename.replace(/ /g, '_'),
            req.userData.name,
            req.body.video_description);
        res.status(200).json({
            message: 'Video upload successful'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});


module.exports = router;
