# Rest API

## installation

```python
pip install djangorestframework

INSTALLED_APPS = [
    ...
    'rest_framework',
]
```

## implementation

### Serializer

```python
from rest_framework import serializers
from employee.models import Users

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ("name", "employee_id", )
        # fields = "__all__"

```

### api

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from employee.serializers import UsersSerializer
from employee.models import Users


class UserListApi(APIView):
    def get(self, request):
        qs = Users.objects.all()
        serializer = UsersSerializer(qs, many=True)
        return  Response(serializer.data)
    
    def post(self, request):
        print(request.data)
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

```

### urls

```python
from django.contrib import admin
from django.urls import path, include
from employee.api import UserListApi

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('employee.urls', namespace='employees')),
    path('api/user_list', UserListApi.as_view(), name='user-list-api')
]

```

### Posted data through JSON


```json
{

        "employee_id": "10004",
        "name": "chanuka",
        "age": 25,
        "ranking": 10.0
}
```

## Update date in the database USING REST

```python
# urls.py
path('api/employee/<employee_id>', UserDetailApi.as_view(), name='user-list-api'),

# serializer.py
from rest_framework import serializers
from employee.models import Users

class UsersSerializer(serializers.ModelSerializer):
    employee_id = serializers.CharField(required=False) # when updateing this is not req
    name = serializers.CharField(required=False)
    age = serializers.IntegerField(required=False)

    class Meta:
        model = Users
        # fields = ("name", "employee_id", )
        fields = "__all__"
        
        
  # api.py
class UserDetailApi(APIView):
    def get(self, request, employee_id):
        qs = Users.objects.filter(employee_id=employee_id)
        if qs.exists():
            employee = qs.first()
            serializer = UsersSerializer(employee)
            return Response(serializer.data)
        return Response(f"User with {employee_id} is not found", status=status.HTTP_404_NOT_FOUND)

    def put(self, request, employee_id):
        print(request.data)

        qs = Users.objects.filter(employee_id=employee_id)
        if qs.exists():
            employee = qs.first()

            serializer = UsersSerializer(employee, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

## Delete data From REST

here we use, the same Details AP I however a separate method to delete

```python
# repitetive function

def get_employee(employee_id):
    qs = Users.objects.filter(employee_id=employee_id)
    if qs.exists():
        employee = qs.first()
        return employee
    return None


class UserDetailApi(APIView):
    def get(self, request, employee_id):
        employee = get_employee(employee_id=employee_id)
        if employee is None:
            return Response(f"User with {employee_id} is not found", status=status.HTTP_404_NOT_FOUND)
        serializer = UsersSerializer(employee)
        return Response(serializer.data)

    
    
    def put(self, request, employee_id):
        employee = get_employee(employee_id=employee_id)
        if employee is None:
            return Response(f"User with {employee_id} is not found", 		       		status=status.HTTP_404_NOT_FOUND)
        serializer = UsersSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        def delete(self, request, employee_id):
        employee = get_employee(employee_id=employee_id)
        if employee is None:
            return Response(f"User with {employee_id} is not found", status=status.HTTP_404_NOT_FOUND)
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
		
```

## Adding authentication in Django Rest Api /  Globally

settings.py 

```python
INSTALLED_APPS = [
    'rest_framework',
    'rest_framework.authtoken',
]

REST_FRAMEWORK = {
    # globally setting the policy
    'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication', # login
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ],
}

```

## Use Rest Using Request

```bash
pip install requests
```

api.py

```python
# we are importing this when we provide user name and password in return we can obtain the authentication

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

# if authentication is passed send the token key to the respective user
class UserAuthentication(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response(token.key)

```

clients.py (STEP 1)

```python
import requests

# url = "http://127.0.0.1:8000/api/user_list/"
# response = requests.get(url)
# print(response.text)

# getting the auth token
url = "http://127.0.0.1:8000/api/auth/"

response = requests.post(url, data={
    'username': 'admin',
    'password': '1234',
})
print(response.json())
# this will print the token key
```

clients.py (STEP 2)

```python
import requests

# getting the auth token
def get_token():
    url = "http://127.0.0.1:8000/api/auth/"

    response = requests.post(url, data={
        'username': 'admin',
        'password': '1234',
    })
    return response.json()

def get_data():
    url = "http://127.0.0.1:8000/api/user_list/"
    header = {"Authorization": f"Token {get_token()}"}
    response = requests.get(url, headers=header)
    emp_data = response.json()
    for e in emp_data:
        print(e)

get_data() # gives u, all the data in the database
```

![image-20201021190054979](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201021190054979.png)

Cleaned Code

```python
import requests

URL = "http://127.0.0.1:8000" 

# getting the auth token
def get_token():
    url = f"{URL}/api/auth/"

    response = requests.post(url, data={
        'username': 'admin',
        'password': '1234',
    })
    return response.json()

def get_data():
    url = f"{URL}/api/user_list/"
    header = {"Authorization": f"Token {get_token()}"}
    response = requests.get(url, headers=header)
    emp_data = response.json()
    for e in emp_data:
        print(e)
        
get_data()
```

## Post data*(Creating) using Requests through Rest Frame work

use: Bulk creation of data

```python

def create_new(count):
    url = f"{URL}/api/user_list/"
    header = {"Authorization": f"Token {get_token()}"}
    data = {
        "employee_id": f"100{count}",
        "name": f"newbie{count}",
        "ranking": 10,
        "age": 25
    }
    response = requests.post(url, data=data, headers=header)
    print(response.text)


for e in range(20):
    create_new(e)
```

## Delete and edit Data

```python 

def edit_data(employee_id):
    url = f"{URL}/api/employee/{employee_id}/"
    header = {"Authorization": f"Token {get_token()}"}
    data = {
        "employee_id": f"{employee_id}",
        "name": "WOW",
        "ranking": 1,
        "age": 27
    }
    response = requests.put(url, data=data, headers=header)
    print(response.text)


def delete_data(employee_id):
    url = f"{URL}/api/employee/{employee_id}/"
    header = {"Authorization": f"Token {get_token()}"}
    response = requests.delete(url, headers=header)
    print(response.status_code)


for e in range(10004, 10019):
    delete_data(e)
```

```
path('list/', CustomerListApi.as_view(), name='customer-list'),
path('add/', CustomerAddApi.as_view(), name='customer-add'),
path('<id>/', CustomerDetailApi.as_view(), name='customer-detail'),
path('<id>/edit/', CustomerEditAPI.as_view(), name='customer-edit'),
path('<id>/delete/', CustomerDeleteAPI.as_view(), name='customer-delete'),
```