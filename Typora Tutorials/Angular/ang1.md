# AngularJS vs Angular 10

AngularJS is referred to as Angular1, after that angular 2 is released. 

## Install the Angular CLI

```
npm install -g @angular/cli
```



## Create a workspace and initial application

```
ng new my-app
```



## Run the application

```
cd my-app
ng serve --open
```

## Kill a process

```
// 3680 is the process id
taskkill /F /PID 3680

```

## Architecture of Angular

e2e - contains end to end tests that corresponds to root level application along with test configuration files

node_modules -  contains set of npm packages for the entire workplace

src - contains all the root level application source files for the application

edit config - specify configurations for the code editor

 angular.json - all th CLI configuration defaults 

browsers list - configure sharing of target browsers  

karma.conf.js - application specific karma configuration - karma is a test runner 

package.lock.json - provides version information for the all the packages installed

package.json - configures npm package dependancies 

readme - introductary documentation for the root app 

ts.config.app. json - application specific typescript configuration 

tsconfig.json - contains default typescript configuration 

tsconfig.spec.json - type script config for all  application tests

tslint.json - application specific Ts lint configuration 



## SRC

### app folder  > app configs

CLI automatically adds CSS and JS files when building ur application, hense we dont need to add any link or script tags when building the application 

### main.ts > entry point for the application 

it complies the application with JIT compiler, or the just in time complier and bootstraps the application root module, 

### polyfills.ts 

provides scripts for the browser support.

### test.ts > 

entry point for all the unit tests



## APP

## app.components.ts  

deffines the logic for the application root component

##  app.module.ts  > root app module



# How Angular Loads

## angular.json 

this defines all the parts and all the standards of ur angular application. and this also specifies which ts and which index.html file to be executed. 

```
            "index": "src/index.html",
            "main": "src/main.ts",
```



## Then angular app moves to Main.ts  > app_module 

```typescript
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule) // loads app moduls
  .catch(err => console.error(err));

```



## then moves to app.module.ts

consits of all the components that are required by an  angular application. these components are essential to run the application. in case if u create any component it has to be declared in the declarations array.

then angular checks bootstrap array then it goes to **APP_COMPONENT**

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]  // loads app component
})
export class AppModule { }

```



## then moves to app.components.ts

 ![image-20201103194413952](https://i.loli.net/2020/11/03/9weGEjByV5T3NZk.png)



all the components that are present in the angular application are related to this root component 



## Then it goes to app-root > in index.html

Angular now  goes to app component loads the data in app component html file template which  is defined in the Template URL and render it to the Index.html file

# Summary

angular.json > Main.ts  > app_module.ts > app.components.ts > app-root > index.html 

# Type Script

typescript is a superset of javascript, browsers only understand javascript hense it is required to convert typescript in to java script. that process is called transpilation. by using typescript u can use any of the javascript libraries. any code that u write in JS will be valid in TS and u can change JS code to TS by simply changing the extension of those files. typescript is OOP but JS is a scripting language, 

## installation of typescript

```
npm install -g typescript
```

## converting ts into JS

```
tsc filename.ts	
```

how ever in angular this is not required. when u use the ng server command, angular automatically converts TS files into JS 

## executing  the converted JS file

```
node filename.js
```

# TypeScript Basics

```typescript
let b:boolean = false;
console.log(b);

let c : number = 10;
console.log(c); // 10

let d : number = 0o10;
console.log(d); // 8

let b: number = 0b10;
console.log(b); // 2

let x : number = 0xff;
console.log(x); // 255

let firstName :string = "chanuka";
console.log(firstName);

let aa : string[] = ["TS", "JS"];
let bb : Array<string> = ["TS", "JS"];
console.log(aa, bb);

let ac : [number, string] = [10, "chanuka"]; // respectively u have to define the values
console.log(ac);

const ad = 10;
console.log(ad);


enum fruit{
    apple = 1, // default = 0
    banana , // auto incremented
    mango,
    orange
}

console.log(fruit.apple);

let fruitName : string = fruit[1];
console.log(fruitName);


```

## any >  u dont know the data type

```typescript
let ag: any = "String";
ag = 10;
ag = "";

```

## Object

```
let ah: object;
```

## let vs var

```javascript
// let vs var
function myFunc() { 
    for (let i = 0; i < 2 ; i++) {
        console.log("welcome to Chanuka");
        
    }
    console.log("Value of i is :" + i); 
    // above let will give u an error and var will give u  2
    // always better to use let it is safer
}

myFunc();
```

## type assertions

```typescript
let myvar;

let myvar2 : number = Number(<string>myvar)
let myvar3 : number = Number(myvar as string)


```

## Functions 

```typescript
function product(a:number, b:number) {
    return a * b;
}

console.log(product(2,3));


//anonyous functions
let w = function product(a:number, b:number) {
    return a * b;
}

console.log(w(2,3));


```

```typescript
let z = 3;
let w = function product(a:number, b:number) {
    return a * b * z;
}

console.log(w(2,3)); // 18
```

## arrow functions  =>  lambda functions in python 

```javascript
let ex = (a) => console.log(a);
ex(10)

// in after the conversion JS 
var ex = function (a) { return console.log(a); };
ex(10);

```

## Classes

```typescript
class myClass
{
    j:number;
    constructor(k:number){
        this.j = k;
    }

    value(){
        return("The Number is " + this.j);
    }
}

let myObj = new myClass(10);
console.log(myObj.value());
```

corresponding JS code

```typescript
var myClass = /** @class */ (function () {
    function myClass(k) {
        this.j = k;
    }
    myClass.prototype.value = function () {
        return ("The Number is " + this.j);
    };
    return myClass;
}());
var myObj = new myClass(10);
console.log(myObj.value());

```

## Inheritance

```typescript
class ParenClass
{
    j:number;
    constructor(k:number){
        this.j = k;
    }

}


class ChildClass extends ParenClass{
    i:number;
    constructor(m:number, k:number){
        super(k);
        this.i = m;
    }
    value(){
        return "value from parent " + this.j + " value from child " + this.i
    }
}

let childObj = new ChildClass(10, 5);
console.log(childObj.value());

```



## private => accessible only to the  parent class, for child classes this is not accessible

## protected => accessible to both parent and child

## public => accessible to all 

# Interfaces

```typescript
interface myIntegers
{
    s: number;
    t:string;
    myFunc();
}

class A implements myIntegers
{
    s:number;
    t:string;
    constructor(s:number, t:string){
        this.s =s;
        this.t=t;
    }
    myFunc(){
        console.log("Implementing an interface " + this.s + " " + this.t);
        
    }
}

let obj = new A(1, "chanuka")
console.log(obj.myFunc()); // after the console.log this returns object => undefiend
console.log(obj.s);
console.log(obj.t);

```

 

