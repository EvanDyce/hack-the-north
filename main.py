import cv2

import numpy as np 
  
image = cv2.imread('input/input - 202409141945/PXL_20230723_002002761.jpg') 

image = cv2.resize(image, (1920,1080))
cv2.imshow('Original Image', image) 
cv2.waitKey(0) 