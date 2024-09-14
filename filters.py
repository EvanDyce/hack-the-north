import cv2
import numpy as np

def box_blur(image):
    (height, width, _) = image.shape
    
    n = min(height, width) // 30
    kernel = 1/(n*n) * np.array([[1 for _ in range(n)] for _ in range(n)])
    
    value = cv2.filter2D(image, -1, kernel)
    return value

def noise_reduction(image):
    return cv2.fastNlMeansDenoisingColored(image,None,10,10,7,21)

    # cv2.imshow('binary', out_binary)  
    # cv2.imwrite('binary.png',out_binary)

    # cv2.imshow('gray', out_gray)  
    # cv2.imwrite('gray.png',out_gray)