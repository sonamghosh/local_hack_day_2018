var imgur = require('imgur');

// Single Image
imgur.uploadFile('./dank_pics_01.jpg')
  .then(function (json) {
    console.log(json.data.link);
  })
  .catch(function (err) {
    console.err(err.message);
  });
