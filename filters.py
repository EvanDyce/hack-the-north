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

def sobel_edge_detection(image):
    # grayscale
    image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # blur
    image_blur = cv2.GaussianBlur(image_gray, (3,3), 0) 
    return cv2.Sobel(src=image_blur, ddepth=cv2.CV_64F, dx=1, dy=1, ksize=5) # Combined X and Y Sobel Edge Detection

def canny_edge_detection(image):
    # grayscale
    image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # blur
    image_blur = cv2.GaussianBlur(image_gray, (3,3), 0) 
    return cv2.Canny(image=image_blur, threshold1=100, threshold2=200)

def equalize(image):
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return cv2.equalizeHist(gray_image)