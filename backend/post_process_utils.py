import numpy as np
from config import CONFIDENCE_THRESHOLD

def average_depth(depth_map, bounding_box):
    h, w, x, y = bounding_box["h"], bounding_box["w"], bounding_box["x"], bounding_box["y"]
    depths = depth_map[y:y+h, x:x+w]
    avg_depth = np.mean(depths)
    return avg_depth

def process_bounding_boxes(depth_map, bboxes, data_type):
    for bbox in bboxes:
        bbox = bbox["boundingBox"]
        avg_depth = average_depth(depth_map, bbox)
        bbox['average depth'] = round(avg_depth, 0)

def filter_by_confidence(parsed_data):
    # Filter objects in objectsResult
    if "objectsResult" in parsed_data:
      parsed_data["objectsResult"]["values"] = [value for value in parsed_data["objectsResult"]["values"] if all(tag["confidence"] >= CONFIDENCE_THRESHOLD for tag in value["tags"])]

    # Filter objects in denseCaptionsResult
    if "denseCaptionsResult" in parsed_data:
      parsed_data["denseCaptionsResult"]["values"] = [value for value in parsed_data["denseCaptionsResult"]["values"] if value["confidence"] >= CONFIDENCE_THRESHOLD]

    # Filter objects in tagsResult
    if "tagsResult" in parsed_data:
      parsed_data["tagsResult"]["values"] = [value for value in parsed_data["tagsResult"]["values"] if value["confidence"] >= CONFIDENCE_THRESHOLD]

    # Filter objects in peopleResult
    if "peopleResult" in parsed_data:
      parsed_data["peopleResult"]["values"] = [value for value in parsed_data["peopleResult"]["values"] if value["confidence"] >= CONFIDENCE_THRESHOLD]

    # Filter words in readResult
    # if "readResult" in parsed_data:
    #   for page in parsed_data["readResult"]["pages"]:
    #       page["words"] = [word for word in page["words"] if word["confidence"] >= CONFIDENCE_THRESHOLD]

    return parsed_data

def round_confidence(parsed_data):
    # Round the confidence values in captionResult
    parsed_data["captionResult"]["confidence"] = round(parsed_data["captionResult"]["confidence"], 2)
    print(parsed_data)
    # Round the confidence values in objectsResult
    if "objectsResult" in parsed_data:
      for value in parsed_data["objectsResult"]["values"]:
          for tag in value["tags"]:
              tag["confidence"] = round(tag["confidence"], 2)

    # Round the confidence values in denseCaptionsResult
    if "denseCaptionsResult" in parsed_data:
      for value in parsed_data["denseCaptionsResult"]["values"]:
          value["confidence"] = round(value["confidence"], 2)

    # Round the confidence values in tagsResult
    if "tagsResult" in parsed_data:
      for value in parsed_data["tagsResult"]["values"]:
          value["confidence"] = round(value["confidence"], 2)

    # Round the confidence values in peopleResult
    if "peopleResult" in parsed_data:
      for value in parsed_data["peopleResult"]["values"]:
          value["confidence"] = round(value["confidence"], 2)

    # Round the confidence values in readResult
    if "readResult" in parsed_data:
      for page in parsed_data["readResult"]["pages"]:
          for word in page["words"]:
              word["confidence"] = round(word["confidence"], 2)

    return parsed_data

def extract_cleaned_words(result):
    cleaned_words = []
    if "readResult" in result:
        for page in result["readResult"]["pages"]:
            if "lines" in page:
                for line in page["lines"]:
                    if "words" in line:
                        for word in line["words"]:
                            cleaned_words.append({"content": word["content"], "boundingBox": word["boundingBox"]})
            if "words" in page:
                for word in page["words"]:
                    cleaned_words.append({"content": word["content"], "boundingBox": word["boundingBox"]})
    return cleaned_words

def add_average_depth_to_bounding_boxes(result, depth_map):
    if "denseCaptionsResult" in result:
        process_bounding_boxes(depth_map, result["denseCaptionsResult"]["values"], "denseCaptionsResult")

    if "objectsResult" in result:
        process_bounding_boxes(depth_map, result["objectsResult"]["values"], "objectsResult")

    if "peopleResult" in result:
        process_bounding_boxes(depth_map, result["peopleResult"]["values"], "peopleResult")