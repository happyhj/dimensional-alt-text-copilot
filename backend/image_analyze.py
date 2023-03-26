import requests
import base64
import json
from flask import jsonify
import numpy as np
from PIL import Image
from io import BytesIO
from depth_estimator import depth_estimation
from post_process_utils import average_depth, add_average_depth_to_bounding_boxes, process_bounding_boxes, filter_by_confidence, round_confidence, extract_cleaned_words
from config import AZURE_SUBSCRIPTION_KEY, AZURE_RESOURCE

ENDPOINT = f"https://{AZURE_RESOURCE}.cognitiveservices.azure.com"
ANALYZE_URL = f"{ENDPOINT}/computervision/imageanalysis:analyze"

HEADERS = {
    "Content-Type": "application/octet-stream",
    "Ocp-Apim-Subscription-Key": AZURE_SUBSCRIPTION_KEY,
}
PARAMS = {
    "api-version": "2023-02-01-preview",
    "features": "tags,objects,caption,denseCaptions,read,people",
    "gender-neutral-caption": "False",
    "language": "en"
}

def prepare_api_call(image_data):
    image = Image.open(BytesIO(image_data)).convert('RGB')
    img_array = np.array(image)
    depth_map = depth_estimation(img_array)
    return depth_map

def make_api_call(image_data):
    response = requests.post(ANALYZE_URL, headers=HEADERS, params=PARAMS, data=image_data)
    if response.status_code == 200:
        result = json.loads(response.content)
        return result
    else:
        return None

def post_process_api_call(result, depth_map):
    result = round_confidence(result)
    result = filter_by_confidence(result)

    # cleaned_words = extract_cleaned_words(result)
    # result['readResult'] = {"words": cleaned_words, "content": result['readResult']['content']}

    result['readResult'] = ''

    add_average_depth_to_bounding_boxes(result, depth_map)

    return result

def image_analyze(image_data):
    depth_map = prepare_api_call(image_data)
    result = make_api_call(image_data)
    
    if result:
        processed_result = post_process_api_call(result, depth_map)
        return jsonify(processed_result)
    else:
        return jsonify({"error": "An error occurred while processing the image."}), 500
