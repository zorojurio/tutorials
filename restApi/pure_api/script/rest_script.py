import json
import os

import requests

ENDPOINT = 'http://127.0.0.1:8000/status/api/'
image_path = os.path.join(os.getcwd(), 'api.jpg')


def do_with_img(method='get', data=None, img_path=None):
    headers = {}
    if data is None:
        data = {}
    if img_path is not None:
        with open(image_path, 'rb') as image:
            file_data = {
                'image': image
            }
            r = requests.request(method, ENDPOINT, data=data, files=file_data)
    else:
        r = requests.request(method, ENDPOINT, data=data, headers=headers)
    print(r.text)
    print(r.status_code)
    return r


# creating a new object
# do_with_img(
#     method='post',
#     data={
#         'user': 1,
#         'content': 'new image and content'
#     },
#     is_json=False,
#     img_path=image_path
# )


# updating a current object
do_with_img(
    method='put',
    data={
        'id': 8,
        'user': 1,
        'content': 'new image and content'
    },
    img_path=image_path
)


def do(method='get', data=None, is_json=False):
    headers = {}
    if data is None:
        data = {}
    if is_json:
        headers['content-type'] = 'application/json'
        data = json.dumps(data)
    r = requests.request(method, ENDPOINT, data=data, headers=headers)
    print(r.text)
    print(r.status_code)
    return r
# do(method='post', data={'content': 'this is a new content', 'user': 1})      # this will be printed
