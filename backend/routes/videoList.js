const express = require('express')
const router = express.Router()

const VideoDetails = require('../models/VideoDetails')
const user = require('../models/User')
// let id = "641fc9b4e34517ddc23726fd"

router.get('/api/videolist', (req, res, next) => {
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



router.delete('/api/videos/:id', (req, res, next) => {
    const id = req.params.id;
    VideoDetails
        .deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Video deleted successfully'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})


module.exports = router