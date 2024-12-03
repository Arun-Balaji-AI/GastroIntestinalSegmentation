from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import base64
from io import BytesIO
from segment import SegmentImage
app = Flask(__name__)
CORS(app, resources={r"/segment" : {"origins" : "http://localhost:1234"}}, methods=["POST"], allow_headers=["Content-Type"])

def load_model():
    segmentor = SegmentImage()
    return segmentor

model = load_model()

@app.route('/segment', methods = ['POST'])
def segment_image():
   print(request.files.keys())
   image = request.files['file']
   image = Image.open(image)
   # print(request.files['filename'])
   result = model.segment_scan(image)

   buffered = BytesIO()
   result.save(buffered, format="PNG")
   buffered.seek(0)
   result_image = base64.b64encode(buffered.read()).decode('utf-8')

   return jsonify({"message" : "Segmentation Successful", "result" : result_image})


if(__name__ == "__main__"):
    app.run(host='0.0.0.0', port = 5000, debug=True)

   
