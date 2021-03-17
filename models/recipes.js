const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
    name: {type: String, required: true}
})

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;