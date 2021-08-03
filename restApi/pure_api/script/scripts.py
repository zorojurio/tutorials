import requests

BASE_URL = "http://127.0.0.1:8000/"
END_POINT_LIST = "api/api-list/"
END_POINT_DETAIL = "api/api-detail/1/"


def get_list():
    r = requests.get(BASE_URL + END_POINT_LIST)
    status_code = r.status_code
    if status_code != 200:
        print('probably not a good sign')
    return r.json()


def create_update():
    new_data = {
        'user': 1,
        'content': 'new data',
    }
    r = requests.post(BASE_URL + END_POINT_LIST, data=new_data)
    status_code = r.status_code
    print(r.headers)
    if status_code == requests.codes.ok:
        print(r.json())
        return r.json()
    return r.text


print(create_update())
