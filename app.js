var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();

const port = 8080;
const filesPath = path.join(__dirname, "/files");

console.log(fs.readFileSync(__dirname + "/title2", "utf8"));
console.log("github.com/makitsune\n");
//console.log("[38;2;255;0;0m█[38;2;255;0;0m█[38;2;0;255;0m█[38;2;0;255;0m█[38;2;0;0;255m█[38;2;0;0;255m█");

app.use((req, res, next) => {
	console.log(req.ip.split(":")[3] + " => " + req.originalUrl);
	next();
});

if (!fs.existsSync(filesPath)) fs.mkdirSync(filesPath);
console.log("Using files folder: " + filesPath);
app.use("/", express.static(filesPath));

app.get("/qrcode.js", (req, res) =>
	res.send(
		fs.readFileSync(
			__dirname + "/node_modules/qrcode-generator/qrcode.js",
			"utf8",
		),
	),
);

app.get("/", (req, res) => {
	let files = fs
		.readdirSync(filesPath)
		.filter(file => file.slice(0, 1) != ".");

	//files = files.concat(files).concat(files).concat(files).concat(files)

	let html = fs
		.readFileSync(__dirname + "/page.html", "utf8")
		.replace(/\[files\]/gi, JSON.stringify(files));

	res.send(html);
});

app.listen(port, () => {
	console.log("Web server running on *:" + port);
});
