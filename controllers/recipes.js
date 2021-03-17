const express = require('express');
const router = express.Router();

const Recipe = require('../models/recipes')

//Index route
router.get('/', (req, res) => {
    Recipe.find({}, (err, foundRecipe, next) => {
        if (err) {
            console.log(err)
            next(err)
        } else {
            res.render('index.ejs', {
                recipe: foundRecipe,
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
    Recipe.create([
        {
            name: 'recipe xyz'
        },
        {
            name: 'recipe abc'
        }
    ], (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/recipes')
        }
    })
})

//Show Route
router.get('/:id', (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        res.render('show.ejs', {
            recipe: foundRecipe,
            currentUser: req.session.currentUser
        })
    })
})

//Post route - Create Recipes
router.post('/', (req, res) => {
    Recipe.create(req.body, (error, createdRecipe) => {
        if (err) {
            console.log(err)
        } else {
            //TODO Redirect to show page 
            res.redirect('/recipes')
        }
    })
})

//Edit Route
router.get('/:id/edit', (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        res.render('edit.ejs'), {
            recipe: foundRecipe,
            currentUser: req.session.currentUser
        }
    })
})

//Update Route 
router.put('/:id', (req, res) => {
    Recipe.findOneAndUpdate(req.params.id, req.body, { new: true}, (err, updatedRecipe))
    //TODO Redirect to show page 
    res.redirect('/recipes')
})

module.exports = router;

