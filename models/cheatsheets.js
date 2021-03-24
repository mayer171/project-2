const mongoose = require('mongoose');
const { Schema, model } = mongoose;


//USE GridFS for uploading images 
const cheatSheetSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: false},
    ofTags: [],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const CheatSheet = model('CheatSheet', cheatSheetSchema);

module.exports = CheatSheet;



