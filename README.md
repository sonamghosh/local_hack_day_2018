### Local Hack Day 2018

For anyone who wants to scan their hand written work onto their computers or want a quick spell check, they can use this application. Microsoft Azure has Computer Vision APIs and Spell Check APIs which allow us to translate handwritten text to a string and also spell check the string. Google Drive API allows us to automatically push our text document onto your personal account. This is great for inddivuals or students who want to quickly convert their handwritten pieces of text whether it be a few sentences or an essay into a digital document to be viewed online for editing and flexibility. 

To access the **main** (backend) scripts within this repository go to the **src** directory which contains the following files:

`analyze-image.js` - Uses the **Microsoft Azure Computer Vision Optical Character Recognition API** to identify text off properly formatted text such as signs or type faces (non-handwriting based) and proceeds to output the text formatted line by line into a text file that is put into a Google Docs document through the **Google Cloud API**. 

`drive.js` - Uses Google Cloud to call the **Google Drive API** to save an output text file into a Google docs document which is saved under the *EssayBoi* directory on our local Google drive. 

`recognize-text.js` - Uses the **Microsoft Azure Computer Vision Text Recognition API** to properly analyze handwritten text and proceeds to output the text formatted line by line into a text file that is put into a Google Docs document through the Google Cloud API 

`response200.json` - Example JSON output when one runs the `recognize-text.js` script on a image that is taken by the phone camera. 

Note for Spell Check functionality, the `spell_check.js` script is used to analyze extracted text from `analyze-image.js` or `recognize-text.js`, which calls upon **Microsoft Azure's Bing Spell Check API**. 

Lastly, all the backend functionalty developed on **NodeJS (Javascript)** is used with the mobile app (`app.js`) that represents the frontend of our stack which was developed using the **React Native** framework for developing apps using **ReactJS (Javascript) **
`

<img src = "full_stack_diagram.png">

