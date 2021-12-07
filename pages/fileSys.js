const fs = require("fs");

const file = fs.readdirSync("./");
//console.log(file);

fs.readdir("./", (err, files) => {
  err ? console.log("Error", err) : console.log("Result", files);
});
