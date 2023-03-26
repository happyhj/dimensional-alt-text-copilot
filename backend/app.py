# app.py
# Standard library imports
from io import BytesIO
import base64

# Third-party imports
from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS, cross_origin
import numpy as np
from PIL import Image
import cv2
import openai
import os

# Local application/library imports
from depth_estimator import depth_estimation
from image_analyze import image_analyze
from config import OPENAI_API_KEY
import json


# Create a Flask application
app = Flask(__name__, static_folder='../frontend/build')

# Enable CORS for all domains on all routes
CORS(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route("/api/analyze/", methods=["POST"])
@cross_origin()
def analyze():
    image_data = base64.b64decode(request.json["image"])
    # image_link = '{"url": "https://scontent-sea1-1.cdninstagram.com/v/t51.2885-15/337568700_773996970820983_4509029153997030641_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=v6bUxfPiV7IAX9Fq_lR&edm=AJ9x6zYBAAAA&ccb=7-5&ig_cache_key=MzA2NjQzNDQxNjE1MDA0NDQyMg%3D%3D.2-ccb7-5&oh=00_AfC5AC-1MGGpRB_WoEH7oUqy1Sns0-vxuv73Q53ohLbP4w&oe=64237AB2&_nc_sid=cff2a4"}'
    return image_analyze(image_data)

@app.route("/api/generate_caption/", methods=["POST"])
@cross_origin()
def createCaption():
    analysis_result = request.json["analysis_result"]
    context = request.json["context"]

    openai.api_key = OPENAI_API_KEY

    prompt = """
Given the image analysis results in JSON format:

""" + json.dumps(analysis_result) + """

And the author-provided information:

""" + json.dumps(context) + """


Based on the image analysis results, please generate detailed image descriptions to enhance spatial understanding for visually impaired individuals. Choose the most beneficial option from the following:

1. Overview
2. Overview, Foreground, and Background
3. Overview, Foreground, Middleground, and Background

Provide the output using the template below:

{
    "overview": "<Generated description for overview>",
    "foreground": "<Generated description for Foreground, if applicable>",
    "background": "<Generated description for Background, if applicable>",
    "middleground": "<Generated description for Middleground, if applicable>"
}
"""
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        temperature=0.5,
        max_tokens=2048,
        n=1,
        stop=None,
        timeout=60,
    )
    print(f'Prompt: {prompt}')
    text = response.choices[0].text
    print(text)
    return jsonify({"image_caption": text})


# Flask endpoint to receive an uploaded image and return the depth estimation
@app.route('/estimate_depth', methods=['POST'])
@cross_origin()
def estimate_depth():
    image_data = base64.b64decode(request.json["image"])
    image = Image.open(BytesIO(image_data)).convert('RGB')
    img_array = np.array(image)
    depth_map_output = depth_estimation(img_array)

    # Convert the depth image array to binary
    _, buffer = cv2.imencode('.png', depth_map_output)

    # Encode the binary as base64 string
    depth_map_str = base64.b64encode(buffer).decode('utf-8')
    return jsonify({"depth_map_image": depth_map_str})

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=8000)

