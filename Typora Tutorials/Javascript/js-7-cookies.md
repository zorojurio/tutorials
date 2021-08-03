# Cookies

![image-20201102102012281](https://i.loli.net/2020/11/02/Gwx5pznmPbirhA2.png)

```html
<label for="ddTHeme">Please select a color</label>
<select name="color" id="ddTHeme" onchange="setColor()">
    <option value="Select Color">Select Color</option>
    <option value="red">Red</option>
    <option value="green">Green</option>
    <option value="blue">Blue</option>
</select>
```

```javascript
window.onload = function () {
    if (document.cookie.length !== 0 ){
        let nameValueArray = document.cookie.split("=");
        let cookieColor = nameValueArray[1];
        document.body.style.background = cookieColor;
        document.getElementById('ddTHeme').value = cookieColor; // set the color in selected box
    }
}
function setColor() {
    let selectedColor = document.getElementById('ddTHeme').value;
    if (selectedColor !== 'Select Color'){
        document.body.style.background = selectedColor;
        document.cookie = "color=" +selectedColor + "; expires=Fri, 5 Nov 2020 01:00:00 UTC;";
    }
}
```

# Cookies Attribute

![image-20201102120128328](https://i.loli.net/2020/11/02/wgDWxF5ndG6NKJH.png)

![image-20201102133255203](https://i.loli.net/2020/11/02/wji9MXUnhSuqfKJ.png)

 ![image-20201102133725064](https://i.loli.net/2020/11/02/scFw6eg9ai2N5DW.png)

![image-20201102134233486](https://i.loli.net/2020/11/02/S1vHMx7LBrtX2Kf.png)

```html
<div>
    <label for="name">Name</label>
    <input type="text" name="name" id="name">
    <br><br>

    <label for="email">Email</label>
    <input type="email" name="email" id="email">
    <br><br>

    <label for="gender">Gender</label>
    <input type="text" name="gender" id="gender">
    <br><br>

    <input type="button" value="set cookie" onclick="setCookie()">
    <input type="button" value="get cookie" onclick="getCookie()">
    <input type="button" value="Clear" onclick="clearTextBoxes()">
</div>
```

```javascript
function setCookie() {
    // only the name section will saved as an pair
    document.cookie = "name=" + document.getElementById('name').value +  ";"  +
        " email=" + document.getElementById('email').value +   ";" +
        " gender=" + document.getElementById('gender').value;
}

function getCookie() {
    alert(document.cookie);
}

function clearTextBoxes() {
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('gender').value = "";
}
```

## How to fix the above problem

## 1. JSON stringify

```javascript
function setCookie() {
    let customObject = {};
    customObject.name = document.getElementById('name').value;
    customObject.email = document.getElementById('email').value;
    customObject.gender = document.getElementById('gender').value;

    let jsonString = JSON.stringify(customObject); // convert jS object to JSON String
    document.cookie = "cookieObject=" + jsonString;
}

function getCookie() {
    let nameValueArray = document.cookie.split("=");
    // document.write(nameValueArray);
    // cookieObject,{"name":"W K G Y Indrachapa Gunathilake",
    // "email":"zorojurio@gmail.com","gender":"dfgdfg"}
    let customObject = JSON.parse(nameValueArray[1]);
    document.getElementById('name').value = customObject.name;
    document.getElementById('email').value = customObject.email;
    document.getElementById('gender').value = customObject.gender;

}

function clearTextBoxes() {
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('gender').value = "";
}
```

## 2. Different cookie for each key- value pair

```javascript
function setCookie() {

    document.cookie = "name="+document.getElementById('name').value;
    document.cookie = "email="+document.getElementById('email').value;
    document.cookie = "gender="+document.getElementById('gender').value;
}

function getCookie() {
    if (document.cookie.lenght != 0){
        let cookeisArray = document.cookie.split("; ");
    	// name=W K G Y Indrachapa Gunathilake,email=zorojurio@gmail.com,gender=dfsdfsdf
        for (let i = 0; i < cookeisArray.length; i++) {
            let nameValueArray = cookeisArray[i].split("=");
            if (nameValueArray[0] === "name"){
                document.getElementById('name').value = nameValueArray[1];
            }
            else if (nameValueArray[0] === "email"){
                document.getElementById('email').value = nameValueArray[1];
            }
            else if (nameValueArray[0] === "gender"){
                document.getElementById('gender').value = nameValueArray[1];
            }
        }
    }else{
        alert("Cookie Not Found")
    }
}

function clearTextBoxes() {
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('gender').value = "";
}
```

# Update Cookies & Delete cookies

![image-20201102193950454](https://i.loli.net/2020/11/02/9dxEOjmQuA7eK5n.png)

# How to check if cookies are enabled

```javascript
function cookiesEnabled() {
    let areCookiesEnabled = (navigator.cookieEnabled) ? true : false ;
    // for older browsers check if the cookie returns what we created
    if (!areCookiesEnabled && typeof navigator.cookieEnabled === "undefined"){
        document.cookie = "myTestCookie";
        areCookiesEnabled = (document.cookie.indexOf("myTestCookie") !== -1)
    }
    return areCookiesEnabled;
}

if (cookiesEnabled()){
    document.write("cookies are enabled");
}else{
    document.write("cookies are disabled");
}
```

# How to check if JS is enabled

```html
<!--if jS is disabled use the following command-->
<noscript>
    <style>
        .rootDivClass{
            display: none;
        }
    </style>
    <h1>It seems You have disabled javascript. please enable JS</h1>
</noscript>
<br>

<div class="rootDivClass">
    <label for="name">Name</label>
    <input type="text" name="name" id="name" onfocus="validateIsEmpty('name')" onblur="validateIsEmpty('name')"
           onkeyup="validateIsEmpty('name')">
    <br><br>
    <label for="gender">gender</label>
    <input type="text" name="gender" id="gender" onfocus="validateIsEmpty('gender')" onblur="validateIsEmpty('gender')"
           onkeyup="validateIsEmpty('gender')">
</div>

<script type="text/javascript">
    function validateIsEmpty(controlId) {
        let control = document.getElementById(controlId);
        if (control.value === "") {
            control.style.background = "red";
        } else {
            control.style.background = "white";
        }
    }
</script>
```

# Window.Location

![image-20201103024909616](https://i.loli.net/2020/11/03/VQdxmSOszJB7I2w.png)

```html
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script>
        window.location = "/index.html";
    </script>
</head>
<body>
    <h1>It seems that you have disabled your javascript. Please enable javascript</h1>
</body>
```



![image-20201103030657855](https://i.loli.net/2020/11/03/RgWsakHeDfdlT8x.png)

![image-20201103030743354](https://i.loli.net/2020/11/03/FEaWUKSVXRz265Z.png)

## Chrome Debugging

![image-20201103070235575](https://i.loli.net/2020/11/03/ayQ5R61iSmLzU9r.png)