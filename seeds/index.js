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
        const price= Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}`, location: `${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://picsum.photos/400?random=${Math.random()}',
            description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem dolorem blanditiis voluptatibus velit officia debitis voluptatum illum consectetur, eos magni at enim illo nobis sapiente! Inventore provident officia praesentium voluptas?',
            price
        })

        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close()
});




