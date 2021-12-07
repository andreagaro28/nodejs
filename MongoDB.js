const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mogoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

//IMPORT ROUTES
const postsRoutes = require("./routes/posts");
app.use("/posts", postsRoutes);

//ROUTES

//CONNECT DB
mogoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connected to database!");
});

//LISTENING SERVER
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}...`);
});
