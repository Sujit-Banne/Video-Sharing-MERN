const express = require('express')
const router = express.Router()

const VideoDetails = require('../models/VideoDetails')

router.get('/api/existingvideo', (req, res, next) => {
    VideoDetails
        .find() //by default find all videos
        .exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router