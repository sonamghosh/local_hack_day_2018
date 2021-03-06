"use strict";

const request = require("request");

function recognizeText() {
  // Replace <Subscription Key> with your valid subscription key.
  const subscriptionKey = "6dbc036b6cad4ec68366da564e52ca88";

  // You must use the same location in your REST call as you used to get your
  // subscription keys. For example, if you got your subscription keys from
  // westus, replace "westcentralus" in the URL below with "westus".

  // Azure Recognize Text API
  const uriBase =
    "https://eastus.api.cognitive.microsoft.com/vision/v2.0/recognizeText?mode=Handwritten";

  /* const imageUrl =
    'http://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg'; */

  // Upload image
  // Test Image
  // i see a brown bear. i see a blue bird. i see the red crab
  const imageUrl = "https://essayboi.serveo.net";

  // Call Microsoft Azure Computer Vision Recognize Text tool to analyze image
  const options = {
    uri: uriBase,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": subscriptionKey
    }
  };

  console.log(options);

  // store json output that has the parsed strings
  var data;
  var jsonResponse2;
  // Stores all the words
  var arr = [];

  request.post(options, (error, response, body) => {
    if (error) {
      console.log("Error: ", error);
      return;
    }
    let jsonResponse = JSON.stringify(response);
    var operationLocation = response.headers["operation-location"];
    console.log("body: " + operationLocation);
    console.log("Getting response");
    var options2 = {
      uri: operationLocation,
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": subscriptionKey
      }
    };
    let timer = setInterval(() => {
      request.get(options2, (error, response, body) => {
        if (error) {
          console.log("Error: ", error);
          return;
        }
        jsonResponse2 = JSON.parse(body);
        console.log(jsonResponse2);
      });
      clearInterval(timer);
    }, 2000);
  });

  // Timer to prevent undefined
  let timer = setInterval(() => {
    // Length of the important section
    var text = "";
    let textResult = jsonResponse2.recognitionResult.lines;
    for (var i = 0; i < textResult.length; i++) {
      var text = text + jsonResponse2.recognitionResult.lines[i].text + "\n";
    }
    console.log(text);

    var outStr = text;

    // Save text string to .txt file
    const fs = require("fs");
    fs.writeFile(__dirname + "/text.txt", outStr, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved");
    });
    clearInterval(timer);
  }, 4000);
}

module.exports = { recognizeText };
