const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("MONGO CONECTION OPEN!!!")
    })
    .catch(err => {
        console.log(" OHH NO CONECTION PROBLEM")
        console.log(err)
    })

const sample = (sampleData) => sampleData[Math.floor(Math.random() * sampleData.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}`, location: `${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })

        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close()
});




