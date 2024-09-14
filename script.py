import os
import cv2

from filters import *

# list entries in the input directory
entries = os.listdir('input')

# filter entries to find the first directory
directories = [entry for entry in entries if os.path.isdir(os.path.join('input', entry))]

# check if we have found exactly one directory
if len(directories) == 1:
    full_path = os.path.join('input', directories[0])
    print(f"The directory is {full_path}.")
else:
    print("There is either no directory or more than one directory in the input directory.")

# check if the directory exists
if not os.path.isdir(full_path):
    print(f"The directory {full_path} does not exist.")
else:
    # list all images in the directory
    files = os.listdir(full_path)
    
    # can change this as we go file by file and handle videos maybe
    image_extensions = ('.jpg', '.jpeg', '.png')
    image_files = [f for f in files if f.lower().endswith(image_extensions)]
    
    # go through each image
    for image_file in image_files:
        image_path = os.path.join(full_path, image_file)
        try:
            img = cv2.imread(image_path)
            
            if img is not None:
                # get image dimensions (height, width, channels)
                height, width, channels = img.shape
                print(f"Image: {image_file}, Size: {width}x{height}, Channels: {channels}")
                
                # display the image
                # img = box_blur(img)
                img = noise_reduction(img)
                
                cv2.imwrite(f'output/{image_file}', img)
            else:
                print(f"Failed to load image: {image_file}")
        except Exception as e:
            print(f"Error opening {image_file}: {e}")