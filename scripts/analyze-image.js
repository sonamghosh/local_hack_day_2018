"use strict";

const request = require("request");

function analyzeImage() {
  // Replace <Subscription Key> with your valid subscription key.
  const subscriptionKey = "ea8b096680c24990a45eba7976aa9c15";

  // You must use the same location in your REST call as you used to get your
  // subscription keys. For example, if you got your subscription keys from
  // westus, replace "westcentralus" in the URL below with "westus".

  // Azure Computer Vision OCR API
  const uriBase =
    "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/ocr";

  /* const imageUrl =
    'http://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg'; */

  // Upload image
  // Test Image
  // i see a brown bear. i see a blue bird. i see the red crab
  const imageUrl = "https://essayboi.serveo.net";

  // Request parameters.
  const params = {
    visualFeatures: "Categories,Description,Color",
    details: "",
    language: "en"
  };

  // Call Microsoft Azure Computer Vision OCR tool to analyze image
  const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": subscriptionKey
    }
  };

  console.log(options);

  // store json output that has the parsed strings
  var data;

  // Stores all the words
  var arr = [];

  request.post(options, (error, response, body) => {
    if (error) {
      console.log("Error: ", error);
      return;
    }
    let jsonResponse = JSON.stringify(JSON.parse(body), null, "  ");
    console.log("JSON Response\n");
    console.log(jsonResponse);
    data = JSON.parse(body);
  });

  // Timer to prevent undefined
  let timer = setInterval(() => {
    // Length of the important section
    /*  var arrLen = data.regions[0].lines.length;

    // Iterate through bounding boxes in JSON and parse strings
    for (var i = 0; i < arrLen; i++) {
      for (var j = 0; j < data.regions[0].lines[i].words.length; j++) {
        // Adds new line at the end of string
        if (j == data.regions[0].lines[i].words.length - 1) {
          arr.push(data.regions[0].lines[i].words[j].text + "\n");
        } else {
          arr.push(data.regions[0].lines[i].words[j].text);
        }
      }
    }
    console.log(arr);

    // Join Strings together, \n indicates line sep
    var outStr = arr.join(" ");
    console.log(outStr);*/
    var outStr = JSON.stringify(data);

    // Save text string to .txt file
    const fs = require("fs");
    fs.writeFile(__dirname + "/text.txt", outStr, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved");
    });
    clearInterval(timer);
  }, 2000);
}

module.exports = { analyzeImage };
