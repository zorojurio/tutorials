# Post Man

## setting and getting the variable 

```javascript
console.log("Hellow world");
let urlVal = pm.variables.get("url");
console.log("Value for the URL ", urlVal);
pm.variables.set("name", "POSTMAN");
console.log(pm.variables.get("name"));
```

## Global Variables

```javascript

let globalVar = pm.globals.get("name");
let globalVar1 = pm.globals.get("Env");
console.log(globalVar, globalVar1);
```

if we add the tests to the collections, and what ever request that belong to that collection will run the tests automatically.



## post request -creating a new user using postman

![image-20201022131819559](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201022131819559.png)

![image-20201022131857578](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201022131857578.png)

## Creating an Environment

environment is a set of key value pairs

![image-20201022151158541](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201022151158541.png)

For production and also development we use different  URLs hence, duplicating the environment and change the initial values help to test the application in both production and development. 



## Newman From CMD

```
npm install -g newman
newman run collectionName.json # package we exported from collections
```

## TESTS

```javascript
tests["Contains Email"] = responseBody.has(data.email);
tests["Contains PassWord"] = responseBody.has(data['password']);
```

```
newman run url
```

## Chaning API -

![image-20201022233448940](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201022233448940.png)

from the get req we get the values and set it in the env

```javascript
jsonData = JSON.parse(responseBody)

value = jsonData.data[1].first_name

console.log(value)
pm.environment.set("username", value);
```

![image-20201022233607669](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201022233607669.png)

## Authorization in POSTMAN

1. Create a post req in postman with https://api.github.com/user/repos

2. gitub > settings > developer settings > personal access token > generate new access token > select priviledges

3. Post man authorization > OAuth2.0 > paste the access token

4. Post man body > raw > json> 

5. ```json
   {
       "name": "intern-repo",
       "description": "this is the repo for the internship"
   }
   
   ```

6. ![image-20201023114409606](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201023114409606.png)

7. check ur github a new repo has been created using the access token

## Install Json Server

```json
npm install -g json-server
json-server --watch db.json # if we dont have db.json this will create dummy data	
C:\Users\Chanuka\AppData\Roaming\npm\node_modules\json-server # db.json location
```

