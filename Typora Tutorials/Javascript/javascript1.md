---
typora-copy-images-to: upload
---

# JavaScript

## Internal

```html
<script type="text/javascript">
        function isEven() {
            let number = document.getElementById('enterNumber').value;
            if (number % 2 == 0){
                alert(number + "is Even");
            }else{
                alert(number + "is Odd");
            }
        }
 </script>

<form id="newId" onsubmit="isEven()">
    <div class="form-group">
        <label for="enterNumber">Number</label>
        <input type="text" class="form-control" id="enterNumber" placeholder="Enter a number">
    </div>
    <div class="text-right">
        <input id="textBox" type="submit" value="check Number" class="btn btn-sm btn-success" >
    </div>
</form>
```

## where to put the script tag

1. Inline	

in the body. put the script tag. HTML elements are not loaded in to the DOM if we put the script tag in the head section. and it will help to prevent null reference 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form action="">
    <input type="text" id="textBox" value="noob">
</form>
<script type="text/javascript">
    document.getElementById('textBox').style.backgroundColor = "red";
</script>
</body>
</html>
```

2. External

   if we put in the head. when browser loads and it finds a JS file in head. it pause loading the HTML and starts downloading's the JS file. only 2 files can be downloaded simultaneously. this affects the loading time of the web page. until the download is completed. it stops the parsing html elements.



## JavaScript Basics

JS is case sensitive

![image-20201027021258414](https://i.loli.net/2020/10/27/IMHo75FDsBtNAhq.png)

Comments

![image-20201027021415427](https://i.loli.net/2020/10/27/bVwuzOrlZIvU6sJ.png)



## Arithmetic

```javascript

let a = 50;
let b = 10;
let c = a + b;
alert(c); // 60

let a = "50";
let b = 10;
let c = a + b;
alert(c); // 5010


let a = "50";
let b = 10;
let c = a - b;
alert(c); // 40       when there is a minus substration is happening
```



## Converting String to Numbers

```javascript
// parseInt and parseFloat

function addNumbers(event) {
    let firstNumber = document.getElementById('firstNumber').value;
    let secondNumber = document.getElementById('secondNumber').value;
    let result = parseFloat(firstNumber) + parseFloat(secondNumber);
    document.getElementById('result').value = result
}
```

## NaN - Not an Number

```javascript
 function addNumbers() {
     let firstNumber = document.getElementById('firstNumber').value;
     if (firstNumber === ""){
         alert("first number is required")
         return;
     }
     if (isNaN(firstNumber)){
         alert("Please Enter a valid number in first number text box");
         return;   // in order to stop the execution return is used
     }
     firstNumber = parseFloat(firstNumber);

     let secondNumber = document.getElementById('secondNumber').value;
     if (secondNumber ===  ""){
         alert("second number is required")
         return;
     }
     if (isNaN(secondNumber)){
         alert("please Enter a valid number in the second text box");
         return;
     }
     secondNumber = parseFloat(secondNumber);

     document.getElementById('result').value = firstNumber + secondNumber;
 }
```

## Strings in JavaScript

### 	concatenation

```java
let string1 = "Hello";
let string2 = "Javascript";
let result = string1.concat(" ", string2);
alert(result);

```

### 	single vs double

![image-20201027072310374](https://i.loli.net/2020/10/27/qGCN5z3HlEw4o7k.png)

### 	uppercase

```javascript
let string1 = "hello worLd";
alert(string1.toUpperCase()); // gives the uppercase
alert(string1); // original string will not be converted
```

### 	lowercase

```javascript
    let string1 = "hello worLd";
    alert(string1.toLowerCase()); // gives u the lowercase of the string
    alert(string1); // original string will not be converted
```

### 	length of a string

![image-20201027072856985](https://i.loli.net/2020/10/27/R98ngrxJ6tL7BMs.png)

### Trim

![image-20201027082654003](https://i.loli.net/2020/10/27/KAyoNqaL4xeiuXl.png)

### Replace

![image-20201027082709025](https://i.loli.net/2020/10/27/BsuhZc7oaP6zvwy.png)

![image-20201027083049373](https://i.loli.net/2020/10/27/MWY2Era7woOFfnK.png)

## Substrings in JavaScript

### 	substring methods

![image-20201027083200500](https://i.loli.net/2020/10/27/MLaOFs47UVgX1Ze.png)



![image-20201027083929290](https://i.loli.net/2020/10/27/6kE8aYp9wZf32Uq.png)

![image-20201027084041156](https://i.loli.net/2020/10/27/MWY2Era7woOFfnK.png)

![image-20201027084221456](https://i.loli.net/2020/10/27/MLaOFs47UVgX1Ze.png)

### 	Difference between substring and substr methods

![image-20201027084341627](https://i.loli.net/2020/10/27/uyiW8lhI6ngqNYS.png)

### 	Difference between slice and substring / Index Of

![image-20201027084458453](https://i.loli.net/2020/10/27/wyp9JxQhTCN4Vrc.png)

```javascript
    function getDomainEmail() {
        let email = document.getElementById('email-address').value;
        let emailPart = email.substring(0, email.indexOf('@'));
        let domainPart = email.substring(email. lastIndex('.'));
        document.getElementById('email-part').value = emailPart;
        document.getElementById('domain-part').value = domainPart;
    }
```

## Switch

![image-20201027204127706](https://i.loli.net/2020/10/27/gq3ECIjuFhm1BzZ.png)



## Ternary Operator

![image-20201027204431524](https://i.loli.net/2020/10/27/5wuUNo23mOVsBve.png)

### Multiple If statements

![image-20201027204836712](https://i.loli.net/2020/10/27/YxqQ2FVTnmlByDG.png)

## While Loops

![image-20201027210228836](https://i.loli.net/2020/10/27/yjXNFBoQ1ewuOr8.png)

![image-20201028071841932](https://i.loli.net/2020/10/28/E8uwpUaSJ6r3heI.png)

![image-20201028071913234](https://i.loli.net/2020/10/28/XEvm8OynUzLVxPI.png)

## Do While loop

![image-20201028072144447](https://i.loli.net/2020/10/28/T5CDZeOyzuQPU3p.png)

## For Loop

![image-20201028072230110](https://i.loli.net/2020/10/28/ouBUmRVLkhMIa65.png)

### 	for loop special cases

```javascript
let userInput = Number(prompt("Please enter an number"));
let start = 0;
for (; start < userInput; start++) {
	document.write(start + "<br/>")
}
```

```javascript
let userInput = Number(prompt("Please enter an number"));
let start = 0;
for (; ; start += 2) {
    if(start  > userInput){
        break;
    }
	document.write(start + "<br/>")
}
```

