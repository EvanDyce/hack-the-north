import cv2
import numpy as np

def box_blur(image):
    (height, width, _) = image.shape
    
    n = min(height, width) // 30
    kernel = 1/(n*n) * np.array([[1 for _ in range(n)] for _ in range(n)])
    
    value = cv2.filter2D(image, -1, kernel)
    return value

def noise_reduction_colour(image):
    return cv2.fastNlMeansDenoisingColored(image,None,10,10,7,21)

def noise_reduction_bw(image):
    return cv2.fastNlMeansDenoising(image,None,10,7,21)