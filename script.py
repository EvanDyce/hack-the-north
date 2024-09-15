import os
import json

from filters import filter_images, filter_videos

base_download_path = 'portal-files/Portal Downloads/Hack the North'
package_name = os.listdir(base_download_path)[0]

# should be our only directory
full_path = os.path.join(base_download_path, package_name)

# check if the directory exists
if not os.path.isdir(full_path):
    print(f"The directory {full_path} does not exist.")
else:
    # get all files, image files, and the specific json file
    all_files = os.listdir(full_path)
    json_file = [f for f in os.listdir(full_path) if f[-4:] == 'json']
    image_files = [f'{full_path}/{f}' for f in os.listdir(full_path) if f.lower().endswith('jpg') or f.lower().endswith('jpeg') or f.lower().endswith('png')]
    video_files = [f'{full_path}/{f}' for f in os.listdir(full_path) if f.lower().endswith('mp4')]
    
    with open(f'{full_path}/{json_file[0]}') as file:
        metadata = json.load(file)
        
    image_options = metadata['image_options'].split(',')
    video_options = metadata['video_options'].split(',')
    
    filter_images(image_files, image_options)
    filter_videos(video_files, video_options)    