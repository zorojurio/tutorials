# OOP

![image-20201031172409819](https://i.loli.net/2020/10/31/9zZuVKTWapvFlCN.png)

## 1. Creating an Object using Constructor Function

```javascript
// constructor
function Employee(firstName, lastName) {
    this.firstName =firstName; 
    this.lastName = lastName;
	
    // mwethod
    this.getFullName = function () {
        return this.firstName + " " + this.lastName;
    }
}

let employee = new Employee("chanuka", "Chathuranga");
document.write(employee.getFullName() + "<br/>");
document.write("First Name = " + employee.firstName + "<br/>");
document.write("Last Name = " + employee.lastName + "<br/>");
```

## 2. Creating an object using literal notation

```javascript
    // we already have the employee object
    let employee =
        {
            firstName: "Chanuka",
            lastName: "Chathuranga",

            getFullName: function () {
                return this.firstName + " " + this.lastName
            }

        }

    document.write(employee.getFullName() + "<br/>");
    document.write("First Name = " + employee.firstName + "<br/>");
    document.write("Last Name = " + employee.lastName + "<br/>");
</script>
```

 ![image-20201031173900488](https://i.loli.net/2020/10/31/5ulsc7YmZ2OqgdW.png)

## 3. Objects created using object literals are singletons.

**when a change is made to the object, it affects the object across the script**

```javascript
    let employee = {
            name: "John"
        }
    // create a new variable and assign the employee object
    let newEmployee = employee;
    document.write("Before Changes <br/>");
    document.write("employee.name " + employee.name + "<br/>")
    document.write("newEmployee.name "+ newEmployee.name + "<br/><br/><br/>")


    // changing the name of the employee object
    newEmployee.name = "Mary";

    // new name is now Mary
    document.write("After Changes <br/>");
    document.write("employee.name " + employee.name + "<br/>")
    document.write("newEmployee.name "+ newEmployee.name + "<br/><br/><br/>")
```

# Global Namespace pollution

teamA.js

```javascript
function Customer(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;

    this.getFullName = function () {
        return this.firstName + " " + this.lastName;
    }
}
```



teamB.js

```javascript
function Customer(firstName, middleName, lastName) {
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;

    this.getFullName = function () {
        return this.firstName + " " + this.middleName+ " " +this.lastName;
    }
}
```

```html
<head>
    <meta charset="UTF-8">
    <title>New Kama</title>
    // in same global namespace u cannot have two functions - we have polluted the global namespace
    <script src="teama.js"></script>
    <script src="teamb.js"></script> // override the above function
</head>
<body>
<div id="resultDiv">

</div>

<script type="text/javascript">
    // customer is calling the one with three parameters
    document.getElementById('resultDiv').innerHTML = new Customer("Tom", "Shelby").getFullName();
    //  Tom Shelby Undefined
</script>
```

![image-20201101000118147](https://i.loli.net/2020/11/01/f2PR7BGOvtzVyZh.png)

Browser only knows the second function which has 3 arguments. later function will always override the previous one.

when we reverse the order of the script files it will give u the one with two parameters. 

## ![image-20201101000643288](https://i.loli.net/2020/11/01/O5yzENJmIgRuxZh.png)



# Namespace in JS

![image-20201101010740458](https://i.loli.net/2020/11/01/flj8rDMGYU726yo.png)



![image-20201101063859402](https://i.loli.net/2020/11/01/TAc8alUBikHO9hw.png)

```html
<head>
    <meta charset="UTF-8">
    <title>New Kama</title>
    <script src="teama.js"></script>
    <script src="teamb.js"></script>
</head>
<body>
<div id="resultDiv"></div>

<script type="text/javascript">
    document.write(window.ChanTech.teamA.Customer("Chanuka", "Chathuranga").getFullName() + "<br/><br/><br/>")
    document.write(window.ChanTech.TeamB.Customer("Hiruni", "Kaveetha", "Marasinghe").getFullName())
</script>
```

## TeamA.js

```javascript
var ChanTech = ChanTech || {};
ChanTech.teamA = ChanTech.teamA || {};



ChanTech.teamA.Customer =  function (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;

    this.getFullName = function () {
        return this.firstName + " " + this.lastName;
    }
    return this;
}
```

## TeamB.js

```javascript
var ChanTech = ChanTech || {};
ChanTech.TeamB = ChanTech.TeamB || {};

ChanTech.TeamB.Customer = function (firstName, middleName, lastName) {
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;

    this.getFullName = function () {
        return this.firstName + " " + this.middleName + " " + this.lastName;
    }
    return this;
}
```

# Private Members in JavaScript

![image-20201101065934244](https://i.loli.net/2020/11/01/MGtFBRPie1qN7E3.png)

private fields and also private functions of this class, they are available only with in this employee class. they are not available to any code out side of this employee class. 

where as the public fields and public functions, they are available both within the employee class and as well as to any code out side the employee class. 

![image-20201101070441137](https://i.loli.net/2020/11/01/rn7LK9RhGb1zTaA.png)

```javascript
function Employee(firstName, lastName) {

    // public fields
    this.firstName = firstName;
    this.lastName = lastName;

    // private field
    var privateFullName;

    // private function
    // function myFunc(){}
    var privateGetFullName = function () {
        privateFullName = firstName + " " + lastName;
        return privateFullName;
    }

    // privileged function- can access private variables and methods available outside the constructor function
    // can access private variables
    this.privilegedGetFullName = function () {
        return privateGetFullName();
    }

    // public method - cannot call a private function can call privileged methods
    Employee.prototype.publicGetFullName = function () {
        return this.privilegedGetFullName();
    }

}
```

- private function can access only private fields.
-  privileged function can access private methods and also private fields and public fields
- public function can access public fields and also privileged methods, but it cannot access private methods
- both public and privileged function can be accessed outside the constructor function
- private fields and private methods are available  only inside the constructor function. this will give u undefined error if u access private things out side the constructor function.

![image-20201101095206701](https://i.loli.net/2020/11/01/Bl7MiV5L4YeotuK.png)

```javascript
let employee = new Employee("chanuka", "chathuranga");
document.write("Public "+ employee.publicGetFullName() + "<br/>")
document.write("Privileged "+ employee.privilegedGetFullName() + "<br/>")
document.write("Private "+ employee.privateGetFullName() + "<br/>")  // cannot be accessed unresolved method
document.write(employee.privateFullName); // cannot be accessed unresolved field
```

so the above code proves that we cant access private fields and also private methods out side the constructor function. so ever lets consider the following example.

```javascript
let employee = new Employee("Chanuka", "Chathuranga");
employee.privateFullName;
employee.privateFullName = "ABC";  // setting a new public field
document.write(employee.publicGetFullName());
document.write(employee.privateFullName);
```

# Properties in JS

![image-20201101104149403](https://i.loli.net/2020/11/01/jpHRvJxinSUGYcz.png)

```javascript
function Employee(name, age){
    let _name = name;
    let _age = age;

    Object.defineProperty(this, "name", {
        get: function () {
            return _name
        }
    })

    Object.defineProperty(this, "age", {
        get: function () {
            return _age;
        },
        set : function (value) {
            if (value < 1 || value > 100 ){
                alert("Invalid Age!!")
            }
            else {
                _age = value
            }
        }
    })
}


let employee = new Employee("Chanuka", 28);
employee.age = 35;
employee.name = "shelby" // name wil not be changed here bcz it doesnt have a setter
document.write("Name "+ employee.name + "<br/> " + "Age " + employee.age);
```

# Static Members in JS

## Difference between a static member and a instance member

![image-20201101115121847](https://i.loli.net/2020/11/01/w1pCkP5mGbIn7lS.png)

if we have 100 instances there will be 100 instance members only specific to that instance, however there will only be one static member in the memory



## Example -Calculating area of a circle

```javascript
function Circle(radius) {

    this.radius = radius; // instance field
    Circle.PI = 3.141; // static field

    this.calculateArea = function () {
         let area = this.radius * this.radius * Circle.PI;
         return area;
    }
}

let circle = new Circle(10); // instantiatin a cirlce
document.write("Area " + circle.calculateArea())
```

# Static Methods in JavaScript

![image-20201101120530900](C:\Users\Chanuka\AppData\Roaming\Typora\typora-user-images\image-20201101120530900.png)

```javascript
function Shape(shapeName) {
    this.shapeName = shapeName;
    Shape.Count = ++Shape.Count || 1;

    // if this field already exists. increment the value by one
    // if it doesn't exists initialized it to one

    Shape.ShowCount = function () {
        return Shape.Count;
    }
}

let shape1 = new Shape("Circle");
let shape2 = new Shape("Rectangle");
let shape3 = new Shape("Triangle");
document.write("Shape count " + Shape.ShowCount() + "<br/>");
document.write("Creating a new shape <br/>")
let shape4 = new Shape("Square");

document.write("Shape count " + Shape.ShowCount());
```

# Prototype in JS

![image-20201101122049202](https://i.loli.net/2020/11/01/QqfgKcPVjaIOy1J.png)

### Normal Way

```javascript
function Employee(name) {
    this.name = name;

    this.getName = function () {
        return this.name;
    }
}

let emp1 = new Employee("Mark");
let emp2 = new Employee("Sara");

document.write(emp1.getName() + "<br/>")
document.write(emp2.getName() + "<br/>")
```

### with prototype

```javascript
function Employee(name) {
    this.name = name;
}

// with out the keyword prototype will give u an error
Employee.prototype.getName = function () {
    return this.name;
}

let emp1 = new Employee("Mark");
let emp2 = new Employee("Sara");

document.write(emp1.getName() + "<br/>")
document.write(emp2.getName() + "<br/>")
```

# Overriding JS Functions

```javascript
function Employee(name) {
    this.name = name;
}

Employee.prototype.getName = function () {
    return this.name;
}

getEmployeeDetails();

function getEmployeeDetails() {
    Employee.prototype.getName = function () {
    	return this.name.toUpperCase();
}
let emp1 = new Employee("Mark");
let emp2 = new Employee("Sara");

document.write(emp1.getName() + "<br/>")
document.write(emp2.getName() + "<br/>")
}
```





```javascript
let alert = function (msg) {
    document.write(msg)
}
alert("Hello");
```

# Inheritance in JS

![image-20201101164832508](https://i.loli.net/2020/11/01/iylIGKe1xCtXZ8U.png)

```javascript
// parent
var Employee = function (name) {
    this.name = name;
}

Employee.prototype.getName = function () {
    return this.name
}


// child
var PermanentEmployee = function (annualSalary) {
    this.annualSalary = annualSalary;
}

let emp = new Employee("Carl");
PermanentEmployee.prototype = emp;

let pe = new PermanentEmployee(5000);
document.write(pe.getName());  // carl is the out put

alert(pe instanceof Employee); // true - employee is instance of Employee
```

## hasOwnProperty 

```javascript
// parent
var Employee = function (name) {
    this.name = name;
}

Employee.prototype.getName = function () {
    return this.name
}

// child
var PermanentEmployee = function (annualSalary) {
    this.annualSalary = annualSalary;
}

// instantiating
let emp = new Employee("Carl");
PermanentEmployee.prototype = emp;

document.write("employee name: " + emp.hasOwnProperty('name')+ "<br/>")
document.write("employee salary: " + emp.hasOwnProperty('annualSalary')+ "<br/>")
```

```javascript
// parent
var Employee = function (name) {
    this.name = name;
}

Employee.prototype.getName = function () {
    return this.name
}

// child
var PermanentEmployee = function (annualSalary) {
    this.annualSalary = annualSalary;
}

// instantiating
let emp = new Employee("Carl");
PermanentEmployee.prototype = emp;

let pe = new PermanentEmployee(25000);

document.write("employee name: " + emp.hasOwnProperty('name')+ "<br/>")
document.write("employee salary: " + pe.hasOwnProperty('annualSalary')+ "<br/>") 
// pe object has the property 'annualSalary'

document.write("employee name: " + emp.hasOwnProperty('name')+ "<br/>")
```

```javascript
// parent
var Employee = function (name) {
    this.name = name;
}

Employee.prototype.getName = function () {
    return this.name
}

// child
var PermanentEmployee = function (annualSalary) {
    this.annualSalary = annualSalary;
}

// instantiating
let emp = new Employee("Carl");
PermanentEmployee.prototype = emp;

let pe = new PermanentEmployee(25000);

document.write("employee name: " + emp.hasOwnProperty('c')+ "<br/>") // true
document.write("pe salary: " + pe.hasOwnProperty('annualSalary')+ "<br/>") // true
document.write("pe name: " + pe.hasOwnProperty('name')+ "<br/>")  // false
document.write(pe.getName() + "<br/>")  // this will get u the name bcz of inheritance
```

## Inheritance using Objects.create

```javascript
var Employee = function (name) {
    this.name = name
}

Employee.prototype.getName = function () {
    return this.name
}

var ParentEmployee = function (name, annualSalary) {
    this.name = name
    this.annualSalary = annualSalary
}

ParentEmployee.prototype = Object.create(Employee.prototype);

var pe = new ParentEmployee("Chanuka", 25);
document.write(pe.name + " " + pe.annualSalary + "<br/>");
document.write(pe.getName() + " " + pe.annualSalary + "<br/>");
alert(pe instanceof Employee);
alert(pe instanceof ParentEmployee);
```

# Abstract Classes

In OOP, 

when we try to instantiate an abstract class will give u a compile error. Abstract classes can only be used as a base class. 



```javascript
var Shape = function () { // super abstract class
     this.shapeName = "None";
     throw new Error("Cannot create an instance of abstract class");

}
Shape.prototype.draw = function () {
     return "Drawing " + this.shapeName
}


var Circle = function (shapeName) { // child class
     this.shapeName = shapeName;

}
 Circle.prototype = Object.create(Shape.prototype);

let circle = new Circle("Circle");
document.write(circle.draw()); // bcz of the inheritance we will be able to use this method
 alert(circle instanceof Circle); // true
 alert(circle instanceof Shape); // true
```

# Polymorphism 

Polymorphism means "many forms", and it occurs when we have many classes that are related to each other by inheritance. 

For example, think of a superclass called `Animal` that has a method called `animalSound()`. Subclasses of Animals could be Pigs, Cats, Dogs, Birds - And they also have their own implementation of an animal sound (the pig oinks, and the cat meows, etc.):

```javascript
var Shape = function () {

}
Shape.prototype.draw = function () {
     return "I am a generic shape";
}

var Circle = function () {

}
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.draw = function () {
     return "I am a Circle";
}

var Square = function () {

}
Square.prototype = Object.create(Shape.prototype);
Square.prototype.draw = function () {
     return "I am a Square";
}

// Triangle
var Triangle = function () {

}
Triangle.prototype = Object.create(Shape.prototype);

var shapes = [new Shape(), new Circle(), new Square(), new Triangle()]

 shapes.forEach(function (shape) {
     document.write(shape.draw() + "<br/> ");
 })
```

# Strict Mode in JS

![image-20201102073003045](https://i.loli.net/2020/11/02/shigyTp8mLGAZU9.png)

if u enable strict mode in JavaScript, it will raise errors. 

```javascript
"use strict"; // following error will only occur if u use this statement, 
// with out the above statement it will consider as a global strin

myString = "This is a String";  // in console u ll see an undefined error
document.write(myString);
```

```javascript
myString = "This is a String"; //  this line works
document.write(myString);

function myFunc() {
    "use strict"; // limited only to the scope of the function
     otherString = "This is another string"; 
     document.write(otherString); // raise an undefined error
}
myFunc();
```

## Assigning value to a read only property

```javascript
var Employee = function (name) {
    var _name = name;

    Object.defineProperty(this, "name",{
       get() {
           return _name
       }
    });
}

let emp = new Employee("Chanuka");

// note that in this case name is set as a read only property
// hence assigning a value to a read only property will fail silently without throwing an error
emp.name = "Chanuka C";
document.write(emp.name);
```