const mongoose = require('mongoose');
const { Schema, model } = mongoose;


//USE GridFS for uploading images 
const cheatSheetSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: false},
    ofTags: []
})

const CheatSheet = model('CheatSheet', cheatSheetSchema);

module.exports = CheatSheet;



