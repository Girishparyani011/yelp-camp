const mongoose = require("mongoose");
const cities = require ('./cities')
const {descriptors, places} = require("./seedHelpers")
const campground = require("../models/campground");

mongoose.set('debug', true) // Enable Mongoose debugging

mongoose.connect("mongodb://localhost:27017/Yelp-Camp", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async ()=>{
    await campground.deleteMany({});
    for (let i = 0; i < 50; i++ ){
        const random1000 = Math.floor(Math.random()* 1000); // generating a random no. for indxing a random location from cities
        const price = Math.floor(Math.random()* 20 ) +10 ;
        const camp = new campground({
            location:`${cities[random1000].city}`, 
            title: `${sample(descriptors)}, ${sample(places)}`,
            image: " https://source.unsplash.com/collection/483251",
            description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin",
            price: price


        })
    await camp.save();
    }
}

seedDB()