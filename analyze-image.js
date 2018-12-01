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

// store json output that has the parsed strings
var data;

// Stores all the words
var arr = [];


request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
  console.log('JSON Response\n');
  console.log(jsonResponse);
  data = JSON.parse(body);
});

// Timer to prevent undefined
let timer = setInterval(
  () => {
    // Length of the important section
    var arrLen = data.regions[0].lines.length;

    // Iterate through bounding boxes in JSON and parse strings
    for (var i = 0; i < arrLen; i++) {
      for (var j = 0; j < data.regions[0].lines[i].words.length; j++) {
        if (j == data.regions[0].lines[i].words.length - 1) {
          arr.push(data.regions[0].lines[i].words[j].text + '\n')
        }
        else {
        arr.push(data.regions[0].lines[i].words[j].text)
        }
      }
    }
    console.log(arr)

    // Join Strings together, \n indicates line sep
    var outStr = arr.join(" ");
    console.log(outStr)

    clearInterval(timer);
  }, 2000)
