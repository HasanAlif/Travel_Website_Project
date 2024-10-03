//This Code write for database 

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://cdn.earthroulette.com/ER/photo-1418854982207-12f710b74003-1030x687.jpg",
        set: (v)=> v === "" ? "https://cdn.earthroulette.com/ER/photo-1418854982207-12f710b74003-1030x687.jpg" : v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

