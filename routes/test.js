const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("tua mamma è una puttana");
});

app.listen(3000);
