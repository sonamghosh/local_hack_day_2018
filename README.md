### Local Hack Day 2018

Developers: Sonam Ghosh, Brian He, Halmon Lui

License: MIT License

For anyone who wants to scan their hand written work onto their computers or want a quick spell check, they can use this application. **Microsoft Azure** has **Computer Vision APIs** and **Spell Check APIs** which allow us to translate handwritten text to a string and also spell check the string. **Google Drive API** allows us to automatically push our text document onto your personal account. This is great for individuals or students who want to quickly convert their handwritten pieces of text whether it be a cooking recipe or a rough draft essay into a digital document to be viewed online for editing and flexibility. 

To access the **main** (backend) scripts within this repository go to the **src** directory which contains the following files:

`analyze-image.js` - Uses the **Microsoft Azure Computer Vision Optical Character Recognition API** to identify text off properly formatted text such as signs or type faces (non-handwriting based) and proceeds to output the text formatted line by line into a text file that is put into a Google Docs document through the **Google Cloud API**. 

`drive.js` - Uses Google Cloud to call the **Google Drive API** to save an output text file into a Google docs document which is saved under the *EssayBoi* directory on our local Google drive. 

`recognize-text.js` - Uses the **Microsoft Azure Computer Vision Text Recognition API** to properly analyze handwritten text and proceeds to output the text formatted line by line into a text file that is put into a Google Docs document through the Google Cloud API 

`response200.json` - Example JSON output when one runs the `recognize-text.js` script on a image that is taken by the phone camera. 

Note for Spell Check functionality, the `spell_check.js` script is used to analyze extracted text from `analyze-image.js` or `recognize-text.js`, which calls upon **Microsoft Azure's Bing Spell Check API**. 

Lastly, all the backend functionalty developed on **NodeJS (Javascript)** is used with the mobile app (`app.js`) that represents the frontend of our stack which was developed using the **React Native** framework for developing apps using **ReactJS (Javascript)**

The app may be downloaded from here (remember to install Expo first from the Google Play Store or Apple App Store in order to access the app):

https://expo.io/@nomlahlui/essay-boi

Check out our devpost as well!:

https://devpost.com/software/essay-boi

<img src = "full_stack_diagram.png">


**Update Dec 04, 2018**:

Added Python Scripts that use the bounding box output of a extracted text and used the OpenCV package to draw out the boxes on top of the detected word including adding the detected words on there. This will be used in the future for a potential Augumented Reality (AR) version of the project. 

**TODO**: Insert Image Output here in the future

**Update Dec 10, 2018**:

Playing around with using Neural Model for OCR Handwriting Recognition, so that there is less reliance on using a Cloud API for computation since it requires computation credits; however, will maybe use Cloud Services (Google Cloud, AWS, Microsoft Azure) to train complex model using GPU power available in the cloud.

Idea is to utilize a Convolutional Recurrent Neural Network (CRNN) created on the PyTorch Deep Learning Framework Library (they recently updated to version 1.0, so there is testing to be done , but includes new neat features such as deploying model for production to be used in other environments such as mobile etc, C++ frontends, etc.). Example of a paper that uses a CRNN is found in the following link: https://arxiv.org/pdf/1507.05717.pdf (**An End-to-End Trainable Neural Network for Image-based Sequence Recognition and Its Application to Scene Text Recognition** by *Shi et.al, 2015*). A CRNN is essentially a complex neural network structure made up of both Convolutional Neural Network (CNN) and Recurrent Neural Network architectures. In the case of the paper linked above, it consists of convolutional layers which extract features from the input image which contains text followed by a bidirectional LSTM (Long Short Term Memory) RNN structure consisting of recurrent layers predicting a label distribution followed by a transcription layer transcribing the predictions of each frame to form the output. (**TODO**- insert architecture picture).

Note: Not entirely sure if this will work, seems like most instances are trying their best on hard handwriting types such as cursive and anything else from old times. Also not sure, if it does multiple lines for multiple sentences. Seems like the architectures have nothing to do with bounding boxes either so there must be a separate thing to do with that. Will currently test on a sample localhost with a Flask app to upload pics, maybe hopefully can turn into mobile production through ONNX to transform PyTorch model into a Caffe2 model to be used on Android. 

Seems like there is a paper on putting bounding boxes on the detected text and it happens to use the implementation of the Neural Network in the paper I put above -- https://arxiv.org/pdf/1611.06779.pdf (**TextBoxes: A Fast Text Detector with a Single Deep Neural Network** by *Liao et. al. 2016*). The researchers in this use a scene text detection apprach. The Bounding Box network implementation is a 28-layer fully connected CNN (**TODO**: Include picture of network architecture) where 13 layers are from the existing VGG-16 model followed by 9 extra convolutional layers.  The same researchers also made a version called Textbox++ which can be found here --- https://arxiv.org/pdf/1801.02765.pdf (**TextBoxes++: A Single-Shot Oriented Scene Text Detector** by *Liao et. al. 2018*) 
