const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
});

module.exports = mongoose.model('Campground', CampgroundSchema);
//export, so module.exports is going to be equal to our model which I have to compile
// the model is Campground, and the schema is CampgroundSchema
