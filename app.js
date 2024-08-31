const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const data = require("./init/data.js");
const path = require("path");

//const MONGO_URL = 'mongodb://127.0.0.1:27017/test';
const MONGO_URL = "mongodb://localhost:27017/test";

main()
    .then(()=>{
        console.log('Connected to MongoDB');
    })
    .catch((err)=>{
        console.log('Error connecting to MongoDB:', err);
    })

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.get("/", (req,res)=>{
    res.send("Hello World,I am Root");
});


//index Route
app.get("/listings", async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    });



//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})


//show Route
app.get("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{ listing }); 
})


//create Route
app.post("/listings", async (req,res)=>{
    
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})




// app.get("/testListing", async (req,res)=>{
//     let sampleListing = new Listing(data,

//         {
//             title: "My New Villa",
//             desciption: "By the beach",
//             price: 1200,
//             location: "Calangute, Goa",
//             country: "India",
//         }
// );
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("succesful testing");
// });


app.listen(8080,()=>{
    console.log("server is running on port 8080");
})