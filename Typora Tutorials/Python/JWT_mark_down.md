# JSON Web Tokens (JWT) 

JWT is just for authorization not authentication they're slightly different with authentication.

what you're doing is you're taking in a username and a password and authenticating to make sure that username and password is correct it's like  logging the user in to a system.

Authorization is making sure that the user that sends requests to your server is the same user that actually logged in. during the authentication process. its authorizing that this user has access to this particular system.  

1. Authorization is normally done is by using session so for example you have a session ID then you send down in the cookies of the browser 

2. then every time the client makes request, they send that session ID up to the server and the server checks its memory,  says ok, 

3. find what user has that session ID it finds that user and then it does the authorization to make sure the user has access.

   ![image-20201022013608818](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201022013608818.png)

## JWT

![image-20201022020225216](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201022020225216.png)

## JWT with Django REST FrameWork

```
pip install djangorestframework_simplejwt
```

settings.py

```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}
```

Urls.py

```python
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    #  crete the token for the first time
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # 
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]	

# pair means two token one is access token and one is refresh token. when ur access token is expired then u use the refresh token to get a new access token
```

## how to get the JWT token from the requests

```python 
import requests

URL = "http://127.0.0.1:8000"


def get_jwt_token():
    url = f"{URL}/api/token/"
    response = requests.post(url, data={
        'username': 'admin',
        'password': '1234',
    })
    res = response.json()
    r, a = res.get('refresh'), res.get('access')
    return r, a


refresh, access = get_jwt_token()
print("refresh:", refresh)
print("access:", access)
```

## getting the data using JWT & Requests

```python
def get_data():
    url = f"{URL}/api/user_list/"
    headers = {'Authorization': f"Bearer {access}"}
    response = requests.get(url, headers=headers)
    employee_data = response.json()
    for e in employee_data:
        print(e)
```

## CRUD using JWT & Requests

```python


def create_new(count):
    url = f"{URL}/api/user_list/"
    headers = {'Authorization': f"Bearer {access}"}
    data = {
        "employee_id": f"100{count}",
        "name": f"newbie{count}",
        "ranking": 10,
        "age": 25
    }
    response = requests.post(url, data=data, headers=headers)
    print(response.text)


def edit_data(employee_id):
    url = f"{URL}/api/employee/{employee_id}/"
    headers = {'Authorization': f"Bearer {access}"}
    data = {
        "employee_id": f"{employee_id}",
        "name": "WOW",
        "ranking": 1,
        "age": 27
    }
    response = requests.put(url, data=data, headers=headers)
    print(response.text)


def delete_data(employee_id):
    url = f"{URL}/api/employee/{employee_id}/"
    headers = {'Authorization': f"Bearer {access}"}
    response = requests.delete(url, headers=headers)
    print(response.status_code)


delete_data(10036)
```

