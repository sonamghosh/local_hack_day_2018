'use strict';

// Import functions from upload_to_imgur.js
var func1 = require('./upload_to_imgur');

const request = require('request');

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = 'ea8b096680c24990a45eba7976aa9c15';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase =
    'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/ocr';

/* const imageUrl =
    'http://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg'; */

// Upload image
//const imageUrl = func1.uploadImgur('./dank_pics_01.jpg')
//console.log('hello world' + imageUrl)

//const imageUrl = 'https://i.imgur.com/7QZjQMt.jpg'
// i see a brown bear. i see a blue bird. i see the red crab
const imageUrl = 'https://s3.amazonaws.com/tinycards/image/14cb9cce8ef640adf685355ff8df44eb'

// Request parameters.
const params = {
    'visualFeatures': 'Categories,Description,Color',
    'details': '',
    'language': 'en'
};

const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

console.log(options)

var output;

request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
  console.log('JSON Response\n');
  //console.log(jsonResponse);
  output = jsonResponse
});

// Timer to prevent undefined
let timer = setInterval(
  () => {
    console.log(output);
    clearInterval(timer);
  }, 3000)
