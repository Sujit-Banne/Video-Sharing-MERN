const express = require('express')
const router = express.Router()
const VideoDetails = require('../models/VideoDetails')
router.get("/:uploader_name", async (req, res) => {
    console.log(req.params);
    try {
        const myVideos = await VideoDetails.find({
            uploader_name: req.params.uploader_name
        })
        console.log(myVideos);
        res.status(200).json({
            status: "Fetched",
            contacts: myVideos
        })
    } catch (e) {
        res.status(401).json({
            status: "Failed to fetch",
            message: e.message
        })
    }
})

module.exports = router