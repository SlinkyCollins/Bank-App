const express = require("express");
require("dotenv").config();
let port = process.env.PORT;
const app = express();
const userRouter = require("./Routes/user.Route");
const transactionRouter = require("./Routes/transaction.Route");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
let uri = process.env.URL;

const corsOptions = {
  origin: ["http://localhost:5173", "https://nairanest.vercel.app"], // Allow only these origins
  credentials: true, // If using cookies/auth
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", userRouter);
app.use("/api/transactions", transactionRouter);

app.get("/", function (req, res) {
  res.send("hello world!");
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../bank-app/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../bank-app/dist", "index.html"));
});

app.listen(port, () => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log(`Connected to Mongoose server on port ${port}`);
    })
    .catch((err) => {
      console.log(err);
      console.log("Failed to connect to Mongoose server");
    });
});