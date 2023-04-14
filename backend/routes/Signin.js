const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')
require('dotenv').config()
const key = process.env.KEY

const User = require('../models/User')

router.post('/api/signin', (req, res, next) => {
    console.log(req.body.email);
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                //no user found
                return res.status(401).json({
                    message: "Authentication failed"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Authentication failed'
                    })
                }
                if (result) {
                    //token here
                    const token = jwt.sign({
                        userId: user[0]._id,
                        name: user[0].name,
                        // lastName: user[0].lastName,
                        email: user[0].email,
                    },
                        key,
                        {
                            expiresIn: "1h"
                        });
                    return res.status(200).json({
                        message: 'Authentication successful',
                        token: token,
                        user: user
                    })
                }
                res.status(401).json({
                    message: 'Authentication failed'
                })
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router