const express = require('express');
const router = express.Router();

const CheatSheet = require('../models/cheatsheets')

//Index route
router.get('/', (req, res) => {
    CheatSheet.find({user: req.session.currentUser}, (err, foundSheets, next) => {
        if (err) {
            console.log(err)
            next(err)
        } else {
            res.render('index.ejs', {
                sheets: foundSheets,
                currentUser: req.session.currentUser
            })
        }
    })
})

//New route
router.get('/new', (req, res) => {
    res.render('new.ejs', { currentUser: req.session.currentUser })
})

//Seed route 
router.get('/seed', (req, res) => {
    CheatSheet.create([
        {
            name: 'Vim',
            image: 'http://www.viemu.com/vi-vim-cheat-sheet.gif',
            ofTags: ['cli', 'vim', 'editor'],
            user: req.session.currentUser,
        },
        {
            name: 'Git',
            image: 'https://intellipaat.com/mediaFiles/2019/03/Git-Cheat-Sheet.jpg',
            ofTags: ['version controll', 'cli'],
            user: req.session.currentUser,
        },
        {
            name: 'Python',
            image: 'https://hakin9.org/wp-content/uploads/2020/02/beginnersPythonCheatSheet-01.jpg',
            ofTags: ['Python'],
            user: req.session.currentUser,
        },

    ], (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/cheatsheets')
        }
    })
})

//Show Route
router.get('/:id', (req, res) => {
    CheatSheet.findById(req.params.id, (err, foundSheet) => {
        res.render('show.ejs', {
            sheet: foundSheet,
            currentUser: req.session.currentUser
        })
    })
})

//Post route - Create CheatSheets

router.post('/', (req, res) => {
    CheatSheet.create(req.body, (err, createdCheatSheet) => {
        if (err) {
            console.log(err)
            
        } else {
            //TODO Redirect to show page 
            res.redirect('/cheatsheets')
        }
    })
})

//Edit Route
router.get('/:id/edit', (req, res) => {
    CheatSheet.findById(req.params.id, (err, foundSheet) => {
        console.log(foundSheet)
        res.render('edit.ejs', {
            sheet: foundSheet,
            currentUser: req.session.currentUser,
        })
    })
})

//Update Route 
router.put('/:id', (req, res) => {
    CheatSheet.findOneAndUpdate(req.params.id, req.body, { new: true}, (err, updatedCheatSheet))
    //TODO Redirect to show page 
    res.redirect('/cheatsheets')
})

//Delete Route 
router.delete('/:id', (req, res) => {
    CheatSheet.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('/cheatsheets')
    })
})
module.exports = router;

