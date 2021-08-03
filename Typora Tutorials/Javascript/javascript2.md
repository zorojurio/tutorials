# 1. Arrays

```javascript
let myArray = new Array();
myArray[0] = "chanuka"
myArray[1] = "chanuka"
myArray[2] = "chanuka"
myArray[3] = "chanuka"
myArray[4] = "chanuka"
myArray[5] = "chanuka"
myArray[6] = "chanuka"
alert(myArray)

let newArray = []
newArray[0] = "chanuka"
newArray[1] = "chanuka"
newArray[2] = "chanuka"
alert(newArray)
```

## *1First and last elements of an array

![image-20201028075203708](https://i.loli.net/2020/10/28/HcsIEuhP9Qmfv8r.png)

```javascript
let myArray = new Array(10, 20, 30);
alert(myArray);
```

### ![image-20201028092150044](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201028092150044.png)

<img src="https://i.loli.net/2020/10/28/UWcZbtQNrTfuVpF.png" alt="image-20201028092225732" style="zoom:150%;" />

## 2. Push() - add new elements  and changes the length of the array

```javascript
var myArray = [];
for(let i = 0; i < 5 ; i ++){
	myArray[i] = i * 2 ;
}
for(let i = 0; i < 5 ; i ++){
	documnt.write(myArray[i] + "<br/>")
}

alert(myArray.length);
```

```javascript
var myArray = [];
for(let i = 0; i < 5 ; i ++){
	myArray.push(i * 2);
}
alert(myArray.length);
```

## 3. Pop() - removes the last element of the array and returns that element

```javascript
var myArray = [];
for(let i = 0; i < 5 ; i ++){
	myArray.push(i * 2);
}
for(let i = 0; i < 5 ; i ++){
	documnt.write(myArray.pop() + "<br/>")
}

10
8
6
4
2
0

```

## 4. Unshift() - adding the element to the begining of the array

```javascript
let newArray = [2, 3];
newArray.push(4);
newArray.unshift(1)

document.write(newArray + "<br/>")  // 1, 2, 3, 4
document.write(newArray.length + "<br/>")
```

## 5. Shift() -  removes the first element of the array

```javascript
let newArray = [2, 3];
newArray.push(4);
newArray.shift()

document.write(newArray + "<br/>")  // 3, 4
document.write(newArray.length + "<br/>")
```

# Array Mutators

![image-20201028093940427](https://i.loli.net/2020/10/28/aZhLGvApPSo4tQV.png)

```javascript
// working for strings    
let names = ["chanuka", "zoonar", "coonor", "lolla"];
names.sort();
alert(names);

// not working for numbers
let newArray = [2, 3, 10, 55,  1, 23];
newArray.sort(function (a, b)  {return a- b});
alert(newArray);


let newArray = [2, 3, 10, 55,  1, 23];
newArray.sort(function (a, b)  {return a - b}); // + - 0
alert(newArray);

```

![image-20201028114938092](https://i.loli.net/2020/10/28/1aJ2MYjSFp5igWm.png)

# Array Filter method

![image-20201028115523379](https://i.loli.net/2020/10/28/Sk4OmzB6PopJUhQ.png)

![image-20201028115616458](https://i.loli.net/2020/10/28/UEIq9jz8YbPfO2l.png)

![image-20201028115726503](https://i.loli.net/2020/10/28/ZwCPpxF8yghN5D9.png)

![image-20201028115836154](https://i.loli.net/2020/10/28/rS4zo7PGBgUK6Tb.png)

![image-20201028120320278](https://i.loli.net/2020/10/28/T8VAR12fK6vbdnj.png)

THe above code will give u a set.

# Two Dimensional Arrays

![image-20201028120515111](https://i.loli.net/2020/10/28/qnx57HvudePFRrN.png)

## Addition between 2X2 arrays

```html
<script type="text/javascript">
    // first array
    let myArray = new Array(3)
    for (var i = 0; i < myArray.length; i++) {
        myArray[i] = new Array(3)
    }

    myArray[0][0] = 1;
    myArray[0][1] = 2;
    myArray[0][2] = 3

    myArray[1][0] = 4;
    myArray[1][1] = 5;
    myArray[1][2] = 6;

    myArray[2][0] = 7;
    myArray[2][1] = 8;
    myArray[2][2] = 9;


    // printing the first array
    for (var i = 0; i < myArray.length; i++) {
        for (var j = 0; j < myArray[i].length; j++) {
            document.write(myArray[i][j] + "&emsp;" );
        }
        document.write("<br/>")
    }

    // second array
    let myArray1 = new Array(3)
    for (var i = 0; i < myArray1.length; i++) {
        myArray1[i] = new Array(3)
    }

    myArray1[0][0] = 9;
    myArray1[0][1] = 8;
    myArray1[0][2] = 7

    myArray1[1][0] = 6;
    myArray1[1][1] = 5;
    myArray1[1][2] = 4;

    myArray1[2][0] = 3;
    myArray1[2][1] = 2;
    myArray1[2][2] = 1;


    // printing the second array
    document.write("</br>")
    document.write("</br>")
    for (var i = 0; i < myArray1.length; i++) {
        for (var j = 0; j < myArray1[i].length; j++) {
            document.write(myArray1[i][j] + "&emsp;" );
        }
        document.write("<br/>")
    }


    // result 
    document.write("<br/>")
    let result = new Array(3)
    for (var i = 0; i < result.length; i++) {
        result[i] = new Array(3)
    }
    for (var i = 0; i < myArray1.length; i++) {
        for (var j = 0; j < myArray1[i].length; j++) {
            document.write(myArray1[i][j] + myArray[i][j]+ "&emsp;" );
        }
        document.write("<br/>")
    }


    </script>
```

# Function

function is a code block which is used to do repetitive work

```javascript
function addNumbers(firstNumber, secondNumber){
	let sum = firstNumber + secondNumber;
	retrun sum;
}
result = addNumbers(10, 30);
document.write(result);

// one paramenter is missing will give Nan as the answe
result = addNumbers(10);
                    
// when more parameters are given
result = addNumbers(10, 30, 20, 40); // last 2 numbers are ignored


// return statement is not a must 
function addNumbers(firstNumber, secondNumber){
	let sum = firstNumber + secondNumber;
	document.write(sum);
}

let result = addNumbers(10, 20);
alert(result); // Nan
```

# Function Declaration

![image-20201028143518597](https://i.loli.net/2020/10/28/7OTGiEYSNP56pzf.png)

## Anonymous Function

![image-20201028143737838](https://i.loli.net/2020/10/28/wXlWPMSUrdnCoht.png)

anon function call cannot be at the top of the page. before the function is defined u cannot call the function. 

![image-20201028163848276](https://i.loli.net/2020/10/28/a3UeWTd2ruCnmjb.png)

```javascript
function factorial(number) {
    if (number <= 1){
    	return	1;
    }
    return number * factorial(number - 1);
 }

document.write(factorial(5)); // 120
```

![image-20201028165737524](https://i.loli.net/2020/10/28/wm1khVFuM3WlABx.png)

# Local and Global Variables

![image-20201028165909865](https://i.loli.net/2020/10/28/gV1oWEOsyAt7vzm.png)

![image-20201028165952000](https://i.loli.net/2020/10/28/RtUnvNP3iXlQjbg.png)

![image-20201028170102104](https://i.loli.net/2020/10/28/gSOv5mH2MJn3LKk.png)

![image-20201028170229322](https://i.loli.net/2020/10/28/rv1l5AgFxfIQXNm.png)



##  Variable Hoisting

![image-20201028171158747](https://i.loli.net/2020/10/28/9NEfZdKIjRmS2HD.png)

```javascript
let greeting = "hello world from global";


function helloWorld() {
   document.write(greeting);
   let greeting = "Hello from Local";
   document.write(greeting);
}

helloWorld();  // bcz of variable hoisting this also will give u an error
```

![image-20201028174615875](https://i.loli.net/2020/10/28/uje35AEfKX7tmqC.png)