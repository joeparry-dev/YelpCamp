const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("Database connected");
    })
    .catch(err => {
        console.error("Connection error:", err);
    });

//all copied from app.js. Don't need express, just mongoose and campground

// Helper function: returns a random element from the given array
const sample = array => array[Math.floor(Math.random() * array.length)];

// Define an async function to seed the database with sample campgrounds
const seedDB = async () => {
    // Delete all existing campgrounds in the collection
    await Campground.deleteMany({});
    // Loop 50 times to create 50 new random campgrounds
    for (let i = 0; i < 50; i++) {
        // Pick a random index between 0–999 to select a city from the cities array
        const random1000 = Math.floor(Math.random() * 1000);
        // Create a new campground with random location and title
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        // Save the new campground to the database
        await camp.save();
    }
}
// Run the seed function, then close the database connection when done
seedDB().then(() => {
    mongoose.connection.close();
})