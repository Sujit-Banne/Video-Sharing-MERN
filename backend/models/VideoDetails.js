const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId

const uploadSchema = mongoose.Schema({
    uploader_name: { type: String, required: true },
    upload_title: { type: String, required: true },
    video_path: { type: String, required: true },
    thumbnail_path: { type: String, required: true },
    video_description: { type: String },
    user: {
        type: ObjectId,
        ref: "user"
    }
});

module.exports = mongoose.model('Upload', uploadSchema);
