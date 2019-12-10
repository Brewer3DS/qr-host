var bmp = require("bmp-js");
var fs = require("fs");

var data = bmp.decode(fs.readFileSync("title.bmp"));
console.log(data.data);