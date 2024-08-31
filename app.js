const express = require("express");
const app = express();
const mongoose = require("mongoose");

const MONGO_URL = 'mongodb://127.0.0.1:27017/test';

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

app.get("/", (req,res)=>{
    res.send("Hello World,I am Root");
});

app.listen(8080,()=>{
    console.log("server is running on port 8080");
})