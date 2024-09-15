import cv2
import os
import shutil
from vidstab import VidStab
import numpy as np

def filter_images(image_file_list, filter_list):
    for output_option in filter_list:
        if os.path.exists(f'output/{output_option}'):
            shutil.rmtree(f'output/{output_option}')
            
        os.mkdir(f'output/{output_option}')
        
        for file in image_file_list:
            image = cv2.imread(file)
            result = FUNCTION_NAME_TO_FUNCTION[output_option.lower()](image)
            cv2.imwrite(f'output/{output_option}/{output_option.replace(' ', '')}_{file[file.rindex('/')+1:]}', result)

def filter_videos(video_file_list, filter_list):
    stabilizer = VidStab()

    for output_option in filter_list:
        if os.path.exists(f"output/{output_option}"):
            shutil.rmtree(f"output/{output_option}")

        os.mkdir(f"output/{output_option}")

        for file in video_file_list:
            image = stabilizer.stabilize(
                input_path=file, output_path=f"output/{output_option}/{file[file.rindex('/'):]}"
            ) 

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

def to_grayscale(img):
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

def canny_edges(img):
    img = to_grayscale(img)
    return cv2.Canny(img,100,200)

def black_and_white(img):
    imgray = to_grayscale(img)
    (thresh, im_bw) = cv2.threshold(imgray, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    return im_bw

FUNCTION_NAME_TO_FUNCTION = {
    'blur': box_blur,
    'grayscale': to_grayscale,
    'canny edges': canny_edges, 
    'black and white': black_and_white,
    'noise reduction': noise_reduction_colour
}