const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

//New User Route 
router.get('/new', (req, res) => {
    res.render('users/new.ejs', { currentUser: req.session.currentUser} )
})

//Create User Route 
router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
        if (err){
            if (err.code===11000){
                res.send('user already exists')
            } else {
                res.send(err)
            } 
        } else {
            req.session.currentUser = createdUser;
            res.redirect('/recipes')
        }
    })
})

module.exports = router;