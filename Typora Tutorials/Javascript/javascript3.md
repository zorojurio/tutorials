## Clousers

![image-20201028175020129](https://i.loli.net/2020/10/28/mdE1RzSOY8cf2Zr.png)

```javascript
function addNumbers(firstNumber, secondNumber) {
   let returnValue = "Result is: ";

   function add() {
      return returnValue + (firstNumber + secondNumber)
   }
   return add;  // returns the function with parameteres
}

// method 1
let myFunc = addNumbers(10, 20);  // storeing the add function and its parameteres in myFunc
let result = myFunc(); // executing myFunc
document.write(result); // normal result will be generateed as the output

// method 2
let result = addNumbers(10, 20)();
document.write(result);

```

### example for closure

```html
<input type="button" value="Click Me" onclick="alert(newFunc())">

<script type="text/javascript">
    // newFunc is storing the execution of incrementClickCount as a function
    // if we use new func meaning incrementClickCount is executed once
    let newFunc = (function incrementClickCount() {
         let clickCount = 0;
         return (function () {
             return ++clickCount;
         });
    })();
</script>
```

## JS Argument Object

![image-20201028192452349](https://i.loli.net/2020/10/28/mIjEGZ6HAegOf4s.png)

## Getting the sum of the argument object

```javascript
function addNumbers() {
    let sum = 0;
    document.write("Arguments Count: " + arguments.length+ "<br/>");

    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    document.write("Sum of the all the arguments is: "+ sum + "<br/>");
    document.write("<br/>"+ "<br/>")
}

addNumbers(10, 2, 4, 20);
```

## Argument objects is not an array. it only have the length property. other methods will not work with argument object

![image-20201029085405461](https://i.loli.net/2020/10/29/ZsAMYor4RVXb6ET.png)



## Error Handling in Java Script

```javascript
try {
    //undefined function is called and exception is raised
    // control is immediately flows to the catch block
    document.write(sayHello());
    document.write("this line will not be executed bcz directly it goes to the catch block <br/>");
 }
catch (e) { // exception object is passed to the catch.
    document.write("Message: "+ e.message + "<br/>");
    document.write("Description: "+ e.description + "<br/>");
    document.write("Stack trace: "+ e.stack + "<br/>");
}
finally {
    document.write("<h1>this line is guaranteed to executed irrespective of the error </h1>")
}
```

catch cannot catch syntax errors.

## Custom Exception throwing

```javascript
function divide( ) {
     let number = Number(prompt("Please enter a number"));
     let denominator = Number(prompt("Please enter a denominator"));

     try {
         if (denominator === 0){
             throw {
                 error: "Divide By Zero Error",
                 message: "Denominator cannot be zero"
             }
         }else{
             document.write("result " + (number/denominator))
         }
     }catch (e) {
         document.write(e.error + "<br/>");
         document.write(e.message+ "<br/>");
     }
}

divide();
```

# Window Onerror Event

![image-20201029133200306](https://i.loli.net/2020/10/29/NSyXiVFDE4pv5eR.png)

## When the error is surrounded with Try block window.onerror is not fired

```javascript
window.onerror =  function new_kama(msg, url, line){
    alert("Message "+ msg + "\nURL: "+ url + "\nLine: "+ line);
    return true;
}

try {
    NonExistingFunction();
}
catch (e) {
    document.write(e.error);
    document.write(e.message);
}
```

## Custom Window.onerror

```html
<img src="nooimage.jpg" onerror="ImageErrorHandler()" alt="">

<script type="text/javascript">
  function ImageErrorHandler() {
    alert("There is a problem loading the Image");
  }
</script>
```

# Dates

![image-20201029142118114](https://i.loli.net/2020/10/29/hJImlE1CjnLqf4Y.png)

![image-20201029142157092](https://i.loli.net/2020/10/29/agqGtmsnwivoCXD.png)

```javascript
function formatDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month
    }
    let day = date.getDate();
    if (day < 10) {
        day = "0" + day
    }
    return day + "/" + month + "/" +year;
}

document.write(formatDate(new Date()));
```

# Timing In Js

## setInterval();

```html
<div id="timeDiv"></div>
<br/>

<input type="button" value="Stop" onclick="stopClock()">
<input type="button" value="Start" onclick="startClock()">

<script type="text/javascript">
    let intervalID ;

    function startClock() {
        intervalID = setInterval(getCurrentTime, 1000);
    }

    function stopClock() {
        clearInterval(intervalID); //identifier of the repeated function is required
    }

    function getCurrentTime() {
        document.getElementById("timeDiv").innerHTML = Date();
    }
    startClock();

</script>
```

## setTimeOut();

```javascript
let someID = setTimeOut(someFinc, 1000);

// when we want to pass arguments along with th my func 
let someId = setTimeOut(function(){
	someFinc('argument')
}, 1000);

```

## Count down timer using setTimeOut as a recurring function

```html
<input type="text" value="10" id="txtBox">
<br>

<input type="button" value="Stop" onclick="stopTimer('txtBox')">
<input type="button" value="Start" onclick="startTimer('txtBox')">
<script type="text/javascript">
    let intervalID; 
    function startTimer(controlID) {
        let control = document.getElementById(controlID);
        let seconds = control.value;

        seconds -= 1;
        if (seconds == 0) {
            control.value = "Done";
            return;
        } else {
            control.value = seconds;
        }

        intervalID = setTimeout(function () {   // until s becomes zero this function will be called
            startTimer('txtBox')
        }, 1000);

    }

    function stopTimer() {
        clearTimeout(intervalID)
    }
</script>
```

##  

## Image Slide Show

```html
<img src="images/1.jpeg" id="image" alt="newkama" style="width: 150px; height: 150px;">
    <input type="button" value="Start Slide Show" onclick="startSlideShow()">
    <input type="button" value="Stop Slide Show" onclick="stopSlideShow()">
    <div id="result"></div>
    <script type="text/javascript">
        let intervalID;

        function startSlideShow() {
            intervalID = setInterval(changeImage, 500);
        }

        function stopSlideShow() {
            clearInterval(intervalID);
        }

        function changeImage() {
            image = document.getElementById('image');
            let imageSource = image.getAttribute('src');
            let currentImageNumber = imageSource.substring(imageSource.lastIndexOf('/') + 1, imageSource.lastIndexOf(
                '.'));
            if (currentImageNumber == 5) {
                currentImageNumber = 0
            }
            nextImageUrl = "images/" + (Number(currentImageNumber) + 1) + ".jpeg";
            document.getElementById('image').setAttribute("src", nextImageUrl);
            document.getElementById('result').innerHTML = nextImageUrl;
        }
</script>
```

