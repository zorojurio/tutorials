# Events In JavaScript

![image-20201030110716538](https://i.loli.net/2020/10/30/E3gi2eIYA9NBZP4.png)

in the above code this keyword represents the button element. 

## Example2

```html
<input type="button" value="click Me" id="myBtn" onmouseover="changeColorOnMouseOver()" onmouseout="changeColorMouseOut()">

    <script type="text/javascript">
        function changeColorOnMouseOver() {
            let control =document.getElementById('myBtn');
            control.style.background = 'red';
            control.style.color = 'yellow';
        }

        function changeColorMouseOut() {
            let control =document.getElementById('myBtn');
            control.style.background='black';
            control.style.color='white';
        }
        

    </script>
```

## Example3: Confirmation before send to the server

```html
<input type="submit" value="submit" id="btn" onclick="return confirmOnSubmit()">

<script type="text/javascript">
    function confirmOnSubmit() {
        if (confirm("Are you sure you want to submit")) {
            alert("You selected OK");
            return true;
    	}
        else{
                alert("You selected Cancel");
                return false;
            }
    }
</script>
```

## Example 4: When user is typing  change the color of the text box



```html
<label for="txtFirstName">First Name</label>
<input type="text" id="txtFirstName" 
       name="first_name"
       onkeyup="validateRequiredField('txtFirstName')" 								                   onblur="validateRequiredField('txtFirstName')"	>
<br>
<br>
<label for="txtLastName">Last Name</label> 
<input type="text" id="txtLastName" name="last_name"
       onkeyup="validateRequiredField('txtLastName')" 
       onblur="validateRequiredField('txtLastName')">
```



```javascript
function validateRequiredField(textID) {
    let control = document.getElementById(textID)
    control.style.color = "white";
    if (control.value == "") {
        control.style.background = "red";
    }
    else{
        control.style.background = "green";
    }
}
```



# Event Handlers Using Dom

![image-20201030122206649](https://i.loli.net/2020/10/30/DAg7XI62Nr5QUGi.png)

```html
<input type="button" value="Click Me" id="myBtn">

<script type="text/javascript">
    let myBtn = document.getElementById('myBtn');

    myBtn.onmouseover = changeColorOnMouseOver;
    myBtn.onmouseout = changeColorOnMouseOut;
    

    function changeColorOnMouseOver() {
        this.style.background = "red";
        this.style.color = "yello";

    }

    function changeColorOnMouseOut() {
        this.style.background = "black";
        this.style.color = "white";
    }
</script>
```

## Assign Event handlers with anon functions

```html
<input type="button" value="Click Me" id="myBtn">

<script type="text/javascript">
    let myBtn = document.getElementById('myBtn');

    myBtn.onmouseover = function () {
        this.style.background = "red";
        this.style.color = "yello";

    };
    myBtn.onmouseout = function () {
        this.style.background = "black";
        this.style.color = "white";
    }
</script>
```

## DOM overrides the HTML attributes

```html
<input type="button" id="btn" value="Click Me" onclick="click1()">
<script type="text/javascript">
    let btn = document.getElementById('btn')
    btn.onclick = click2;
    
    function click1() {
        alert("This is click 1 Function")
    }

    function click2() {
        alert("this is click 2 function")   // this is the out put
    }
</script>
```

```javascript
// window is the root hense this is a working code
window.document.getElementById('btn') 
```

## Handler that assigns last wins. Last one will override the first one

```html
<input type="button" id="btn" value="Click Me">
<script type="text/javascript">
    let btn = window.document.getElementById('btn')
    btn.onclick = click1;
    btn.onclick = click2; // last assign
    
    function click1() {
        alert("This is click 1 Function")
    }

    function click2() {
        alert("this is click 2 function") // this code will be executed
    }
</script>
```

## Assign event handlers using special methods

```html

<input type="button" id="myBtn" value="Click Me">
<script type="text/javascript">
    myBtn.addEventListener("mouseover", changeOnMouseOver);
    myBtn.addEventListener("mouseout", changeColorOnMouseOut);

    function changeOnMouseOver() {
        this.style.background = "red";
        this.style.color = "yellow";

    }

    function changeColorOnMouseOut() {
        this.style.background = "black";
        this.style.color = "white";

    }
</script>
```

## removing event Handlers

```html

<input type="button" id="myBtn" value="Click Me" >
<input type="button" value="Remove Event Handlers" onclick="removeEventHandlers()" >
<script type="text/javascript">
    myBtn.addEventListener("mouseover", changeOnMouseOver);
    myBtn.addEventListener("mouseout", changeColorOnMouseOut);

    function changeOnMouseOver() {
        this.style.background = "red";
        this.style.color = "yellow";

    }

    function changeColorOnMouseOut() {
        this.style.background = "black";
        this.style.color = "white";

    }
	
    // after the remove button is clicked the following code will remove all the event handlers
    function removeEventHandlers(   ) {
        myBtn.removeEventListener("mouseover", changeOnMouseOver);      
        myBtn.removeEventListener("mouseout", changeColorOnMouseOuts);
    }
</script>
```



## How to assign more than one event handlers. bcz of special methods only we can use many event handlers.

```html

<input type="button" value="click Me" id="myBtn">
<script type="text/javascript">
    
    // here the both event handlers will be executed 
    myBtn.addEventListener("click", clickHandler1);
    myBtn.addEventListener("click", clickHandler2);

    function clickHandler1() {
        alert("Handler 1")
    }
    function clickHandler2() {
        alert("Handler 2")    // in DOM only this code will be executed
    }
</script>
```

# EVENT OBJECT

![image-20201030153704504](https://i.loli.net/2020/10/30/mizEB1aI8uktMLS.png)

```html
<input type="button" value="click Me" id="myBtn" onclick="getEventDetails(event)" onmouseout="getEventDetails(event)"
       onmouseover="getEventDetails(event)">

<div id="resultDiv"></div>
<script type="text/javascript">
    function getEventDetails(event) {
        let eventDetails = "Event Name " + event.type + "<br/>" +
            "X " + event.clientX + "<br/>" +
            "Y" + event.clientY + "<br/>"
            + "Target Type " + event.target.type + "<br/>"
            + "Target Tag Name: " + event.target.tagName;
        document.getElementById('resultDiv').innerHTML = eventDetails;
    }

</script>
```

# Event Bubbling in JS

```html

<head>
    <title>New Kama Tempo</title>
    <style>
        .styleClass{
            display: table-cell;
            border: 1px solid  black;
            padding: 20px;
            text-align: center;
        }
    </style>
</head>

<body>
<div class="styleClass" onclick="alert('Div Clicked')"> DIV Element
    <span class="styleClass" onclick="alert('span clicked')">Span
        <input type="button" value="Click ME" onclick="alert('Button Clicked')">
    </span>
</div>

<div id="resultDiv"></div>
<script type="text/javascript">

</script>
```

when we clicked the button event triggers and then it goes to span and then it goes to div element.

```html
<div id="div1" class="divStyle">DIV 1
    <div id="div2" class="divStyle">DIV 2
        <div id="div3" class="divStyle">
            DIV 3
        </div>
    </div>
</div>
<script type="text/javascript">
    let divElements = document.getElementsByTagName('div'); // return all div elements
    for (let i = 0; i < divElements.length; i++) {
        divElements[i].onclick =  function () {
            this.style.borderColor = "red";
            alert(this.getAttribute('id')+ "Border Colour changed");
        }
    }

</script>
```



## How to prevent Bubbling

```html
 <style type="text/css">
        .divStyle{
            max-width: 200px;
            border: 1px solid black;
            padding: 20px;
            text-align: center;
        }
    </style>

<div id="div1" class="divStyle">DIV 1
    <div id="div2" class="divStyle">DIV 2
        <div id="div3" class="divStyle">
            DIV 3
        </div>
    </div>
</div>
<script type="text/javascript">
    let divElements = document.getElementsByTagName('div'); // return all div elements
    for (let i = 0; i < divElements.length; i++) {
        divElements[i].onclick = function (event) { // same function now be repeated for all the divs
            event = event || window.event; // compatibility reasons
            if (event.stopPropagation()) {
                event.stopPropagation() // after IE 9
            } else {
                event.cancelBubble = true; // before IE 9
            }
            this.style.borderColor = "red";
            alert(this.getAttribute('id') + "Border Colour changed");
        }
    }

</script>
```



## Image Gallery with thumbnails

```html
<-- Main Image -->
<img src="images/1.jpeg" alt="" style="border: 3px solid grey" width="540px" height="540px" id="mainPic">
<br>
<-- Smail other images -->
<div id="myDiv" onclick="changeImage(event)">
    <img src="images/1.jpeg" alt="" class="imgStyle">
    <img src="images/2.jpeg" alt="" class="imgStyle">
    <img src="images/3.jpeg" alt="" class="imgStyle">
    <img src="images/4.jpeg" alt="" class="imgStyle">
    <img src="images/5.jpeg" alt="" class="imgStyle">
</div>
```

```javascript
// getting all the images inside the div elements
let images = document.getElementById('myDiv').getElementsByTagName('img');
for (let i = 0; i <images.length; i++) {
    // for all the images following functions will be created
    images[i].onmouseover = function () {
        this.style.cursor = "hand";
        this.style.borderColor = "#c25447"
    }

    images[i].onmouseout = function () {
        this.style.cursor = "pointer";
        this.style.borderColor = "grey"
    }
}

function changeImage(event) {
    event = event || window.event;

    // getting the image that is clicked from the event
    let targetElement = event.target || event.srcElement;
    console.log()
    // check if the click contains only an image
    if (targetElement.tagName === "IMG"){
        document.getElementById('mainPic').src = targetElement.getAttribute('src');
    }
}
```

# JS Event Capturing

```html
<div class="divStyle" id="DIV1">DIV1
    <div class="divStyle" id="DIV2">DIV2
        <div class="divStyle" id="DIV3">DIV3

        </div>
    </div>
</div>
```

```javascript
// before IE8 and earlier this is not working
let divs = document.getElementsByTagName('div'); // getting the all the divs in the document
for (let i = 0; i < divs.length; i++) {
    divs[i].addEventListener("click", clickHandler, true);
    // false enabled the event bubbling -  goes from most inner to  outer 1,2,3
    // true enabled the event capturing -  goes from parent to child 3,2,1
}
function clickHandler(event) {
    event.stopPropagation(); // stop event capturing
    // bcz of the stopping the div3 element will never get captured
    alert(this.getAttribute('id') + " Click event handled")
    this.style.borderColor = 'red';
}
```

## 

## How to enable both event capturing and bubbling

```javascript
let divs = document.getElementsByTagName('div');
for (let i = 0; i < divs.length; i++) {
    divs[i].addEventListener("click", clickHandler, true);
    divs[i].addEventListener("click", clickHandler, false);
    // with enabling of both event capturing and bubbling
    // events are captured from outer to inner
    // then inner to the outer
}
function clickHandler(event) {
    alert(this.getAttribute('id') + " Click event handled")
    this.style.borderColor = 'red';
}
```

## Prevent Browser default actions

 examples:

	1. clicking a link 
 	2. right click will give u context menu

```html
<-- right click is disabled on html eelemets -- >
<body oncontextmenu="return false">
<h1>On this page right click is disabled</h1>
```

### disabling right click using events

```html
<h1>On this page right click is disabled</h1>
<h3>Event Object is used in here</h3>
<p>for the whole page now right click is disbled</p>
<script type="text/javascript">
    document.oncontextmenu = preventDefaultAction;
    function preventDefaultAction(event) {
        event = event || window.event;
        if (event.preventDefault){
            event.preventDefault()
        }else{
            event.returnValue = false; // before IE8
        }
    }
</script>
```

### disable  redirecting to a link using events

```html
// onclick = return false (same result)
<a href="http://www.facebook.com" onclick="preventDefaultAction()">facebook</a>

<script type="text/javascript">

    function preventDefaultAction(event) {
        event = event || window.event;
        if (event.preventDefault){
            event.preventDefault()
        }else{
            event.returnValue = false; // before IE8
        }
    }
</script>
```

# Which mouse button is clicked

![image-20201031074624811](https://i.loli.net/2020/10/31/4FJmUIE1o5XHsgv.png)

```html
<input type="button" value="CLick Me" onclick="getMouseCLick(event)">
<input type="button" value="Clear" onclick="clearText()">
<br><br>
<textarea id="txtArea" cols="20" rows="13"></textarea>

<script type="text/javascript">
        function clearText() {
            document.getElementById('txtArea').value = "";
        }

        function getMouseCLick(event) {
            if (event.which){ // after IE9
                document.getElementById('txtArea').value += "event.which = " + event.which +"\r\n";
                console.log(event.which)
            }
            else{
                document.getElementById('txtArea').value += "event.button = " + event.button +"\r\n";
            }
        }

        document.oncontextmenu = preventContextMenu;

        function preventContextMenu(event) {
            event = event || window.event;

            if (event.preventDefault){
                event.preventDefault()
            }else{
                event.returnValue = false;
            }
        }
</script>
```

```javascript
document.oncontextmenu = preventContextMenu;

function preventContextMenu(event) {
    event = event || window.event;

    if (event.preventDefault){
        event.preventDefault()
    }else{
        event.returnValue = false;
    }


}

function whichMouseButtonClicked(event) {

    let whichButton;
    if (event.which){
        switch (event.which) {
            case 1:
                whichButton = "Left Button Clicked";
                break;
            case 2:
                whichButton = "Middle Button Clicked";
                break;
            case 3:
                whichButton = "Right Button Clicked";
                break;
            default:
                whichButton = "Invalid Button was Clicked";
                break;
        }
    }
    document.write(whichButton);

}
```

# Mouse Events

![image-20201031091001852](https://i.loli.net/2020/10/31/wv7sLfHP4hE5BYd.png)

```html
<input type="button" value="Single, Double or Right CLick" 
       onmousedown="logEvent(event)" 			        
       onmouseup="logEvent(event)"
       onclick="logEvent(event)" 
       ondblclick="logEvent(event)"
       oncontextmenu="logEvent(event)">

<input type="button" value="Clear" onclick="clearText()">
<br><br>
<textarea id="txtArea" cols="30" rows="10"></textarea>

<script type="text/javascript">
    function logEvent(event) {
        event = event || window.event;

        document.getElementById('txtArea').value += event.type + "\r\n"
    }

    function clearText() {
        document.getElementById('txtArea').value = "";
    }
</script>
```

# POP up window

![image-20201031091930063](https://i.loli.net/2020/10/31/lDxzWsJAVGipNu4.png)

![image-20201031093615289](https://i.loli.net/2020/10/31/CJalVMKH1WEGrpn.png)

![image-20201031093639688](https://i.loli.net/2020/10/31/X9Ae1WYJnt6c7kh.png)

```html
<input type="button" value="Open pop up" onclick="openPopUp()">
<input type="button" value="Close Pop Up" onclick="closePopup()">

<script type="text/javascript">
    let popup;
    function openPopUp() {
        popup = window.open('http://google.com', '_blank' , 'height=300, width=300')
    }

    function closePopup() {
        popup.close()
    }
</script>
```