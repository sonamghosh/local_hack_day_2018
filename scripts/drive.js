var { google } = require("googleapis");
var drive = google.drive("v3");
var key = require("../private_key.json");
var path = require("path");
var fs = require("fs");

//Make request to Google Drive Web Service

function driveUpload(fileName) {
  // retrieve a JWT
  var jwToken = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ["https://www.googleapis.com/auth/drive"],
    null
  );

  jwToken.authorize(authErr => {
    if (authErr) {
      console.log("error : " + authErr);
      return;
    } else {
      console.log("Authorization Success");
    }
  });

  // upload file in specific folder
  var folderId = "1kAKnKLGyf0G6kDGxGu5sSArtxVbMrOCo";
  var fileMetadata = {
    //Rename file upload
    name: "EssayBoi.txt",
    parents: [folderId]
  };
  var media = {
    mimeType: "text/plain",
    body: fs.createReadStream(path.join(__dirname + "/" + fileName))
  };
  drive.files.create({
    auth: jwToken,
    resource: fileMetadata,
    media: media,
    fields: "id"
  });
}

module.exports = { driveUpload };
