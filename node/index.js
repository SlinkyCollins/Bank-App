const express = require('express');
require("dotenv").config();
let port = process.env.PORT 
const app = express();
const userRouter = require("./Routes/user.Route")
const mongoose = require('mongoose');
const cors = require('cors');
let uri = "mongodb+srv://afolabiademola27:Collins5@cluster0.1auibv4.mongodb.net/bank-db?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(express.json());
app.use("/host", userRouter)

app.listen(port, ()=>{
    mongoose.connect(uri)
    .then(()=>{
        console.log(`Connected to Mongoose server on port ${port}`);
    })
    .catch(err=>{
        console.log(err);
        console.log("Failed to connect to Mongoose server");
    });
});