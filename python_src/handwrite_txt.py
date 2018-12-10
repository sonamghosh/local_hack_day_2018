import time
import requests
import cv2
import operator
import numpy as np

import matplotlib.pyplot as plt
from matplotlib.lines import Line2D

# Define Vars
_url = 'https://eastus.api.cognitive.microsoft.com/vision/v1.0/RecognizeText'
# _key = '0df32a5472374c149befa14a67095b0d'
_key = '9b56e626839344ce8ca38336bcf2f526'
#_key = '6dbc036b6cad4ec68366da564e52ca88'

_maxNumRetries = 10

# Helper functions

def processRequest(json, data, headers, params):
    """
    Inputs:
    json,
    data - image data object
    headers - subscription key and data type request
    params:
    boolen object for handwriting or printed text
    """

    retries = 0
    # instantiate an empty var for result
    result = None

    while True:
        response = requests.request('post',
                                    _url,
                                    json=json,
                                    data=data,
                                    headers=headers,
                                    params=params)
        # Get response code from Azure server to be used for further process
        if response.status_code == 429:
            print('Message: %s' & (response.json()))
            if retries <= _maxNumRetries:
                time.sleep(1)
                retries += 1
                continue
            else:
                print('Error: failed after retrying!')
                break
        elif response.status_code == 202:  # Accepts request
            # Query again for result
            result = response.headers['Operation-Location']
        else:
            print('Error code: %d' % (response.status_code))
            print('Message %s' % (response.json()))
        break

    return result

# get text
def getOCRTextResult(operationLocation, headers):
    """
    Params:
    operationLocation - where to get text result
    headers - for sub key
    """

    retries = 0
    result = None

    while True:
        response = requests.request('get', operationLocation, json=None,
                                    data=None, headers=headers, params=None)
        # use get method
        if response.status_code == 429:
            print('Message %s' % (response.json()))
            if retries <= _maxNumRetries:
                time.sleep(1)
                retries += 1
                continue
            else:
                print('Error: failed after retrying')
                break
        elif response.status_code == 200:  # service accepted request
            result = response.json()  # save json
        else:
            print('Error code %d' % (response.status_code))
            print('Message %s' % (response.json()))
        break

    return result


# show result on img
def showResultOnImage(result, img):
    """
    Display obtained results onto input image
    """

    img = img[:, :, (2, 1, 0)]
    fig, ax = plt.subplots(figsize=(12,12))
    ax.imshow(img, aspect='equal')

    lines = result['recognitionResult']['lines']  # assign the 'lines' value at lv 1

    for i in range(len(lines)):
        words = lines[i]['words']  # assign words val at lv2
        for j in range(len(words)):
            tl = (words[j]['boundingBox'][0], words[j]['boundingBox'][1])
            tr = (words[j]['boundingBox'][2], words[j]['boundingBox'][3])
            br = (words[j]['boundingBox'][4], words[j]['boundingBox'][5])
            bl = (words[j]['boundingBox'][6], words[j]['boundingBox'][7])
            # extract text of each word
            text = words[j]['text']
            x = [tl[0], tr[0], tr[0], br[0], br[0], bl[0], bl[0], tl[0]]
            y = [tl[1], tr[1], tr[1], br[1], br[1], bl[1], bl[1], tl[1]]
            # define a box around the word
            line = Line2D(x, y, linewidth=3.5, color='red')
            # Draw box on image
            ax.add_line(line)
            # Write text on image
            ax.text(tl[0], tl[1] - 2, '{:s}'.format(text),
            bbox=dict(facecolor='blue', alpha=0.5),
            fontsize=14, color='white')
    plt.axis('off')
    plt.tight_layout()
    plt.draw()
    plt.show()


# main stuff
mode = input('Which mode do you want, url or pc: ')

if mode == 'pc':
    # 1 -  Load raw image file into memory
    pathToFileInDisk = r'blobbybooboo.jpg'
    with open(pathToFileInDisk, 'rb') as f:
        data = f.read()

    # 2 - Set other params for REST API
    params = {'handwriting' : 'true'}

    headers = dict()
    # assign key using variable
    headers['Ocp-Apim-Subscription-Key'] = _key
    # Define content type
    headers['Content-Type'] = 'application/octet-stream'

    json = None

    # 3 - Post request to azure server
    operationLocation = processRequest(json, data, headers, params)

    # 4 - Get JSON object from Azure server
    result = None
    if (operationLocation != None):
        while True:
            time.sleep(1)
            result = getOCRTextResult(operationLocation, headers)
            if result['status'] == 'Succeeded' or result['status'] == 'Failed':
                break

    # 5 - Load original image and show result on it
    if result is not None and result['status'] == 'Succeeded':
        data8uint = np.frombuffer(data, np.uint8)  # conv string to unsigned int array
        img = cv2.cvtColor(cv2.imdecode(data8uint, cv2.IMREAD_COLOR),
                           cv2.COLOR_BGR2RGB)
        showResultOnImage(result, img)

elif mode == 'url':
    # 1 Retrieve image from url
    urlImage = "https://www.gratefulleadership.com/wp-content/uploads/2013/01/Micahel-Case-Thank-You-2-e1359407348712.jpg"
    json = {'url': urlImage}

    # 2 - Set other params
    params = {'handwriting': 'true'}

    headers = dict()
    headers['Ocp-Apim-Subscription-Key'] = _key
    headers['Content-Type'] = 'application/json'

    data = None

    # 3 - Post request to Azure server
    operationLocation = processRequest(json, data, headers, params)

    # 4 get json obj from azure server
    result = None
    if (operationLocation != None):
        headers = {}
        headers['Ocp-Apim-Subscription-Key'] = _key
        while True:
            time.sleep(1)
            result = getOCRTextResult(operationLocation, headers)
            if result['status'] == 'Succeeded' or result['status'] == 'Failed':
                break

    # 5 - Load og image and show result on it
    if result is not None and result['status'] == 'Succeeded':
        # load og image, fetched from url
        arr = np.asarray(bytearray(requests.get(urlImage).content), dtype=np.uint8)
        img = cv2.cvtColor(cv2.imdecode(arr, -1), cv2.COLOR_BGR2RGB)
        showResultOnImage(result, img)
