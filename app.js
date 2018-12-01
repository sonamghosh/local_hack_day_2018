const drive = require("./scripts/drive");
const express = require("express");
const multer = require("multer");
const upload = multer({
  dest: "uploads/" // this saves your file into a directory called "uploads"
});

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// It's very crucial that the file name matches the name attribute in your html
app.post("/", upload.single("file-to-upload"), (req, res) => {
  res.statusCode = 200;
  res.end("Received file: " + req);
  drive.driveUpload("text.txt");
});

app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});
