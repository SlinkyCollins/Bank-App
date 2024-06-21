const express = require('express');
require("dotenv").config();
let port = process.env.PORT 
const app = express();
const userRouter = require("./Routes/user.Route")
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
let uri = process.env.URL;

app.use(cors());
app.use(express.json());
app.use("/host", userRouter)

app.get('/', function(req, res) {
    res.send("hello world!");
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../bank-app/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../bank-app/dist', 'index.html'));
});

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