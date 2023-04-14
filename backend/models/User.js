const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    // lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,//for unique email addresses
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    profession: { type: String, required: true },
});

module.exports = mongoose.model('user', userSchema);
// const video = mongoose.model('user', userSchema)
// module.exports = video
