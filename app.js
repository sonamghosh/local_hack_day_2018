const drive = require("./scripts/drive");
const analyze = require("./scripts/analyze-image");
const recognize = require("./scripts/recognize-text");
const express = require("express");
const multer = require("multer");

// Setup multer and default storage to jpeg.jpg
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, "jpeg" + ".jpg"); //Appending .jpg
  }
});
var upload = multer({ storage: storage });

// Setup express and port
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/uploads/jpeg.jpg");
});

// It's very crucial that the file name matches the name attribute in your html
app.post("/", upload.single("file-to-upload"), (req, res) => {
  const host = req.host;
  res.statusCode = 200;
  res.end("Received file: " + req);
  console.log("Received image, analyzing...");
  //analyze.analyzeImage();
  recognize.recognizeText();
  let timer = setInterval(() => {
    console.log("Analyzed image, uploading...");
    drive.driveUpload("text.txt");
    console.log("Uploaded image. Complete!");
    clearInterval(timer);
  }, 8000);
});

// Listen on port
app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});
