const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users')

router.get('/new,', (req, res) => {
    res.render('/sessions/new.ejs', { currentUser: req.session.currentUser })
})

router.post('/', (req, res) => {
    User.findOne({ username: req.body.username}, (err, foundUser) => {
        if (err) {
            res.send(err)
        } else {
            if (foundUser) {
                console.log(foundUser)
                if (bcrypt.compareSync(req.body.password, foundUser.password)){
                    req.session.currentUser = foundUser
                    res.redirect('/recipes')
                } else {
                    //TODO Style invalid password response 
                    res.send("<h1>wrong password idiot</>")
                }
            } else {
                res.send("<h1>user not found</>")
            }
        }
    })
})

router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = router;