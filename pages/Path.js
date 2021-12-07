const path = require("path");
const os = require("os");

let pathObj = path.parse(__filename);
let totMem = os.totalmem();
let freeMem = os.freemem();

console.log(`Tot mem: ${totMem}`);
console.log(`Free mem: ${freeMem}`);
