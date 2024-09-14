import os
import cv2

img = cv2.imread("mandrill.jpg", 1)

image_folder = 'input - 202409141945'
full_path = os.path.join('input', image_folder)

# check if the directory exists
if not os.path.isdir(full_path):
    print(f"The directory {full_path} does not exist.")
else:
    # list all files in the directory
    files = os.listdir(full_path)
    
    # only include jpg, jpeg, png
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
                cv2.imshow('Image', img)
                cv2.waitKey(0)
                cv2.destroyAllWindows()
            else:
                print(f"Failed to load image: {image_file}")
        except Exception as e:
            print(f"Error opening {image_file}: {e}")