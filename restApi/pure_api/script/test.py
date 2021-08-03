import json
import os
import requests

# urls
BASE_URL = 'http://127.0.0.1:8000/'
ENDPOINT = BASE_URL + 'status/api/'
AUTH_ENDPOINT = BASE_URL + 'api/token/'
REFRESH_ENDPOINT = BASE_URL + 'api/token/refresh/'

# authentication doata
data = {
    'username': 'admin',
    'password': '1234'
}

# authenticatin using a post request
r = requests.post(AUTH_ENDPOINT, data=data)

# getting the token information
token_information = r.json()
refresh_token = token_information.get('refresh')
access_token = token_information.get('access')
print('........................................')
print(token_information)
print(token_information.get('name'))

# refreshing the authentication
headers = {
    'content-type': 'application/json',
    'Authorization': f"Bearer {access_token}"
}

post_headers = {
    'Authorization': f"Bearer {access_token}"
}

updated_data = {
    'content': 'this is now updated but image is not updated'
}
updated_response = requests.put(ENDPOINT + str(35) + '/', data=updated_data, headers=post_headers)
print(updated_response.json())
