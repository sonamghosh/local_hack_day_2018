// This Script uploads images from local machine to imgur and provide the link

function uploadImgur(filename) {
  var imgur = require('imgur');
  // Upload Single File
  imgur.uploadFile(filename)

  .then(function (json) {
    var link = json.data.link;
    console.log(json.data.link);
    return link
  })
  .catch(function (err) {
    console.err(err.message);
  });
}

uploadImgur('./dank_pics_02.jpg')
