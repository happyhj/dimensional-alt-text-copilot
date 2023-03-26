# depth_estimator_utils.py
import torch
import numpy as np
from PIL import Image
import base64
 
class MiDaSLoader:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MiDaSLoader, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self, model_type="DPT_Large"):
        if self._initialized:
            return

        cache_dir = '~/.cache/torch/hub'
        self.midas = torch.hub.load("intel-isl/MiDaS", model_type,
                                     pretrained=True, force_reload=False, verbose=True, source='github', progress=True,
                                     force_download=False, cache_dir=cache_dir)

        self.device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
        self.midas.to(self.device)
        self.midas.eval()

        midas_transforms = torch.hub.load("intel-isl/MiDaS", "transforms")
        if model_type == "DPT_Large" or model_type == "DPT_Hybrid":
            self.transform = midas_transforms.dpt_transform
        else:
            self.transform = midas_transforms.small_transform

        self._initialized = True

def depth_estimation(image):
    midas_loader = MiDaSLoader()
    midas, transform, device = midas_loader.midas, midas_loader.transform, midas_loader.device
    input_batch = transform(image).to(device)

    with torch.no_grad():
        prediction = midas(input_batch)

        prediction = torch.nn.functional.interpolate(
            prediction.unsqueeze(1),
            size=image.shape[:2],
            mode="bicubic",
            align_corners=False,
        ).squeeze()

    output = prediction.cpu().numpy()
    output = (output - np.min(output)) / (np.max(output) - np.min(output)) * 255
    output = output.astype(np.uint8)
    return output       