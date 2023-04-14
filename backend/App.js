const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const dotenv = require('dotenv')
require('dotenv').config()
const PORT = process.env.PORT || 4000

const checkAuth = require('./middleware/checkAuth')

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// To make uploads folder publically available with '/api/videos' route
app.use('/api/videos', express.static('media/uploads'));

// routes
app.use("/api/user_upload", require('./routes/myvideo'))
app.use(require('./routes/ExistingVideo'))
app.use(require('./routes/Signup'))
app.use(require('./routes/Signin'))
app.use(checkAuth, require('./routes/Upload'))
app.use(checkAuth, require('./routes/videoList'))

//CONNECTING TO MONGODB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI)
mongoose.connection.on('connected', () => {
    console.log('connected to mongoDb');
})
mongoose.connection.on('error', (err) => {
    console.log('error connecting ', err);
})


app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
})