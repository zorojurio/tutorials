# Regex

![image-20201031101356799](https://i.loli.net/2020/10/31/P8vBbFO3sGHUymj.png)

```html
<div>
    <input type="text"  id="txtBox" style="width: 250px">
    <br> <br>

    <input type="button" value="Process String" style="width: 250px" onclick="processString()">
    <br><br>

    <textarea  id="txtArea" cols="30" rows="4"></textarea>
</div>
```

## get only the first digit pattern

```javascript
function processString() {
    let inputString = document.getElementById('txtBox').value;
    let result = inputString.match (/\d/);
    alert(result)
}
```

## get digit globally one by one

```javascript
function processString() {
    let inputString = document.getElementById('txtBox').value;
    let result = inputString.match (/\d/g);  //9,8,9,0
    alert(result)
}
```

## get digits globally full digits

```javascript
function processString() {
    let inputString = document.getElementById('txtBox').value; // hwello9, chana890
    let result = inputString.match (/\d+/g);  //9,890
    alert(result)
}
```

## Enhanced Version of the code

```javascript
function processString() {
    let txtArea = document.getElementById('txtArea')
    txtArea.value = "" // clearing the text area
    let inputString = document.getElementById('txtBox').value;
    let result = inputString.match (/\d+/g);  //9,8,9,0
    if (result != null){  // checking for the null values
        for (let i = 0; i < result.length; i++) {
            txtArea.value += result[i] + "\r\n";
        }
    }

}
```

![image-20201031102647300](https://i.loli.net/2020/10/31/Ak8ESoQuT7V14Ch.png)

![image-20201031102806428](https://i.loli.net/2020/10/31/S4tywb5lkTBV13m.png)

# Tools for RegEx

![image-20201031102819513](https://i.loli.net/2020/10/31/b7nyLUfXVq4BgWu.png)

# Js String & RegEx

![image-20201031113217660](https://i.loli.net/2020/10/31/9k3qlcbfaCWh61n.png)

```javascript
let string = "Tom Contact Number is 1011010110100. His age is 35";
string += "Mark Contact Number is 1011010110100. His age is 45";

document.write(string.match(/\d+/g)); 
// getting all the Numbers in a string and returning the numbers

document.write(string.replace(/\d+/g , " XXXX "));
// replacing digits with XXXX

document.write(string.split(/\d+/g));
// where ever u find the number split the string
```

## search() -  returns the index of the first occurrence, if not return -1

```javascript
let string = "Tom Contact Number is 1011010110100. His age is 35";
string += "Mark Contact Number is 1011010110100. His age is 45";

document.write(string.search(/\d+/g)); // 22
document.write(string.search(/\d{20}/g)); // -1 (returns a digit with 20 numbers)
```

## Case Insensitive Global

```javascript
let string = "Tom Contact Number is 1011010110100. tom is 35. TOM is in London";
string += "Mark Contact Number is 1011010110100. His age is 45";

document.write(string.match(/ToM/gi)); // globally case insetively search for the to pattern ToM
```

# RegEx Object in JS

![image-20201031115603766](https://i.loli.net/2020/10/31/fNMiypU2bqXBzwx.png)

## 1. RegEx literal

```javascript
let string = "Tom Contact Number is 1011010110100. His age is 35";
string += "Mark Contact Number is 1011010110100. His age is 45";

// in the course if u know that the value will not be changed use this
let regexp = /\d+/g; // any number in a given string

document.write(string.replace(regexp, " XXXX "));
```

## 2. RegEx Constructor

```javascript
let string = "Tom Contact Number is 1011010110100. His age is 35";
string += "Mark Contact Number is 1011010110100. His age is 45";

// using RegExp constructor
 let regexp = new RegExp("\\d+", "g");

 document.write(string.replace(regexp, " XXXX "));
```



```javascript
 let string = "Tom Contact Number is 1011010110100. His age is 35";
 string += "Mark Contact Number is 1011010110100. His age is 45";

// using RegExp constructor
 let regexp = new RegExp("\\d+", "g");

 document.write("g = " + regexp.global + "<br/>"); // true
 document.write("i = " + regexp.ignoreCase + "<br/>"); // false
 document.write("m = " + regexp.multiline + "<br/>"); // false
 document.write("source = " + regexp.source + "<br/>");
```

## Exec

```javascript
 let string = "Tom Contact Number is 1011010110100. His age is 35";
 string += "Mark Contact Number is 1011010110100. His age is 45";

// using RegExp constructor
 let regexp = new RegExp("\\d+", "g");
 let result;
 while ((result = regexp.exec(string)) != null){
     document.write(result[0] + "<br/>");
 }
```

## String contains numbers True

```javascript
 let string = "Tom Contact Number is 1011010110100. His age is 35";
 string += "Mark Contact Number is 1011010110100. His age is 45";

// using RegExp constructor
 let regexp = new RegExp("\\d+", "g");
 document.write("String contains number " +regexp.test(string))
```

**Exec and test methods can also be used with literals.**

![image-20201031125726610](https://i.loli.net/2020/10/31/xhiEDSCWdB9IlnY.png)

# Client side validation using regEx

```html
<div>
    <label for="emailAddress" class="form-class"></label>
    <input type="text" id="emailAddress" onkeyup="validateEmail()">
</div>

<script type="text/javascript">
    function validateEmail() {
        let emailTextBox = document.getElementById('emailAddress');
        let email = emailTextBox.value;
        let emailRegEx = new RegExp('');  // regex to be added 

        emailTextBox.style.color = "white";
        if (emailRegEx.test(email)){
            emailTextBox.style.background = "green";
        }
        else{
            emailTextBox.style.background = "green";
        }
    }
```

# JS minification

![image-20201031165602379](https://i.loli.net/2020/10/31/7rH9kxUfZET1BW8.png)s

![image-20201031172040060](https://i.loli.net/2020/10/31/iycBv5oJXGOPzKt.png)