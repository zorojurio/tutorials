#    							Building Blocks of angular

## Installing Bootstrap 

```
npm install bootstrap
```

convince angular about bootstrap, **angular.json** in styles section u have to check in the ng modules then add the path to bootstrap.min.css

```
"styles": [
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "src/styles.css"
],
```

if u installed it properly it will be appeared in the head section. 

## Module - 

allows u to separate the functionality of ur program in to different parts. if u make changes to one module it will not affect with those of others. module will allow u to group together other building blocks. such as component, metadata, etc. 

modules > Ng Modules 

lazy loading > u can load any Ng Module only on ur demand

every angular app has at least one NG module. which is the root module.  this root module referred to as the app module. 

new components should be registered here other wise angular doesn't know about the component.

```typescript
// js imports
import { BrowserModule } from '@angular/platform-browser'; 
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// default app module creatd by angular 

@NgModule({  // module decorator 
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```



**decorators**  basically modify classes or property definitions) also referred to as annotations

NgModule => first identify the app module or root module> then tells angular  how to compile it by making use of the meta data. 

**declarations** are applications. only component. consists of following. 

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
```

 **imports** are used to import the browser module to attain browser services as DOM sanitization, rendering



App components present in both declarations and bootstrap array. this app component is created by CLI for every angular application. when u create more components, u add it them to the declarations array. components cannot be used with declaring them in the NH module. make sure u declare every component. 

**Exports** subset of declarations that are accessible in the component templates of other NG modules. so other components in this application will be able to use this. 

![image-20201104093646773](https://i.loli.net/2020/11/04/pkAStGDq8Tf54W3.png)

## Components - 

component is a class with a template and a decorator, (view) angular application has at least one component, which is root component, root component connects the component hierarchy, with page DOM. all component define classes tat have the application data and logic and also are associated with the HTML template. html template is the view that is to be displayed. components are basically used to control the views of an MVC architecture. 

1. Template > HTML , directives and data bindings
2. Class  >  contains properties and methods 
   1. properties > data for the view template
   2. method > contains logic for the view
3. Decorator > adds meta data to the class making it an angular component. once we decorate an TS class it becomes an angular component

```typescript
import { Component } from '@angular/core'; // importing the component decorator

// in order to add the meta data we are adding this decorator
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // if it takes more than one line use ``
  styleUrls: ['./app.component.css']
})

// using the KW export we enable it to be imported from elsewhere in the class
export class AppComponent { 
  title = 'Angular-Project';
}

```

## Creating new Components using CLI

```typescript
ng generate component servers
ng g c servers // servers is the name of the component
```

## Selector  as an Attribute

```html
  selector: '[app-servers]',
  
  <div app-servers> </div>
```

## Selector as a class

```html
selector: '.app-servers';

<div  class="app-servers"> </div>
```

# Nesting Components inside another component

in the root app  create a folder (Employee)

1. employee.component.html

   ```html
   <table>
       <tr>
           <td>First Name</td>
           <td>{{firstName}}</td>
       </tr>
       <tr>
           <td>Last Name</td>
           <td>{{lastName}}</td>
       </tr>
       <tr>
           <td>Gender</td>
           <td>{{gender}}</td>
       </tr>
       <tr>
           <td>Age</td>
           <td>{{age}}</td>
       </tr>
   </table>
   ```

   

2. employee.component.ts

   ```typescript
   import { Component } from '@angular/core';
   
   @Component({
       selector: 'my-employee', // following template will be rendered, when this tag is used
       templateUrl: './employee.component.html'
       // /src/app/employee//employee.component.html
   })
   
   export class EmployeeComponent{
       firstName: string = "Tom";
       lastName: string = "Hopkins";
       gender: string = "Male";
       age: number = 20;
   }
   ```

   

3.  app.module.ts > appending the new imports

```typescript
// js imports
import { BrowserModule } from '@angular/platform-browser';  // req by all apps that runs on web brow 
import { NgModule } from '@angular/core'; // reqiured to add meta data 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component' // new

// default app module creatd by angular 

@NgModule({  // module decorator 
  declarations: [
    AppComponent, EmployeeComponent // new
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

4.  Adding child template tag (my-employee) to the app.component.html

   ```html
   <h1>{{pageHeader}}</h1>
   <my-employee> </my-employee> 
   <!-- in the above code my employee template will be rendered 
     so the table will be inserted here -->
   
   <br>
   
   <router-outlet>
   
   </router-outlet>
   ```

   

# Styling Files

lets say if we want to style Employee components so well have to include the style URL to the component.ts

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'my-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css',] // this will be applied to above page
    // /src/app/employee//employee.component.html
})

export class EmployeeComponent{
    firstName: string = "Tom";
    lastName: string = "Hopkins";
    gender: string = "Male";
    age: number = 20;
}
```

1. External Style Sheets 

2. inline in the HTML component > in the table element define CSS

3. using style tag

4. using the component decorator in styles property

5. using the component decorator > stylesUrl array

   

lets say that we define fonts in external style sheet> how ever in inline style we have not define fonts. hence whatever u have applied in external style sheet will be applied to table element unless u over ride it in inline styles

# Data binding

this is a way of communication 

### Output data

1. interpolation
2. property binding

### React to user events

event binding >>  (event) = "expression"



# Interpolation

interpolation is all about data binding > class property values to its corresponding templates 

	1.  ONe way > from component to view template
 	2.  one way > from template to component
 	3.  two way >  from template to component  from component to view template

 from component to view template is acheieved through interpolation

```html
export class AppComponent { 
  pageHeader: string = "Emoployee Details";
}

<-- in html -->
{{pageHeader}} // Emoployee Details
{{"Page Header = " + pageHeader}} // Page header = Emoployee Details
{{10+20+30}} // 60 
 {{pageHeader ?  pageHeader : "No header"}}    // Noheader if pageHeader is null 
    
 
```



```javascript
export class AppComponent { 
	pageHeader: string = "Emoployee Details";
	imagePath : strng = "https://www.google/image/100";
}


<img src="{{imagePath}}">
```



# Property Binding

binding a property in class module to templates

```html
<img [src] = 'imagePath'>

export class AppComponent { 
	pageHeader: string = "Emoployee Details";
	imagePath : strng = "https://www.google/image/100";
}
```



## Interpolation and property binding

interpolation is special syntax,  interpolation is convenient 

#### 		when to use interpolation

```html
<img src="http://divkollla/{{imagePath}}"
```

#### 		when to use property binding >  to set non string data value

```html
  isDisabled: boolean = true; // button is disabled
  
  <button [disabled] = 'isDisabled'>New kama</button> 
```

if u want to use tags like inner HTML u ll definitely have to use> property binding

```html
pageDetails : string = "page details";
<span [innerHtml] = 'pageDetails'></span>
```

## 

## Canonical Form

 in this case instead of using square brackets   **<u>bind-</u>**  is used

```html
pageDetails : string = "page details";
<span bind-innerHtml = 'pageDetails'></span>

```



## Binding a Div element with a property

```
  badHtml : string = "Hello <script>  alert('Hacked')</script>";
  <div>{{ badHtml }}</div> // this will give u a normal text
  <div [innerHtml] = 'badHtml'></div> // this will give u a normal text
```

both interpolation and property binding will not execute malicious codes 

## HTML attributes vs DOM property

When browser loads a webpage it creates a DOM of that page. U can think DOM as a API to HTML u can access anything from DOM. DOM contains HTML elements as Objects 

![image-20201108013656256](https://i.loli.net/2020/11/08/XTec9ZM4K3HipG1.png)

```html
  <button [disabled] = 'isDisabled'>New kama</button>  // property binding
// binding to the disabled property of the button object in the DOM

  <button disabled = '{{isDisabled}}'>New kama</button>  // interpolation
```

property binding in Angular means binding to the property of a particular object of the DOM

# Attribute Binding In Angular

when it comes to span tags, span does not have corresponding DOM property. when ever it is possible to use property binding use that, otherwise use Attribute binding. 

```html
colSpan: number = 2;
<th colspan="{{colSpan}}">  // not working
<th [colspan] = "colSpan"> // not working

<th attr.colspan="{{colSpan}}"> // working interpolation
<th [attr.colspan]="colSpan"> // property binding style

```

# Class Binding

```html
classToBeApplied: string = "italicsClass boldClass";  // class component
<button class="colorClass" [class]='classToBeApplied'>My Button</button> 
// all the three classes will be applied
```

##### Case 2

```html
classToBeApplied: string = "italicsClass boldClass";  // class component
applyBoldClass: boolean = true;
<button class="colorClass" [class]='classToBeApplied'>My Button</button>
<br><br>
<button class="colorClass" [class.boldClass]='applyBoldClass'>My Button</button> // colorClass remains
// if value of applyBoldClass is true boldClass will be applied to the button
if applyBoldClass is false boldClass will not be applied



```

##### case 3 - not equal

```html
applyBoldClass: boolean = false;
<button class="colorClass" [class.boldClass]='!applyBoldClass'>My Button</button>
// bold class will be applied (false + false = true)	
```



##### Case 4 - removing existing class using class binding

```html
classToBeApplied: string = "italicsClass boldClass";  // class component
applyBoldClass: boolean = false;


<button class="colorClass boldClass italicsClass" [class.boldClass]='applyBoldClass'>My Button</button> // bold class is removed from here.
```

##### Case 5 - remove or add multiple CSS classes

```java
export class AppComponent { 
  classToBeApplied: string = "italicsClass boldClass";
  applyBoldClass: boolean = true;
  applyItalicsClass: boolean = true;

  addClass(){
    let classes = {
      boldClass : this.applyBoldClass,
      italicsClass : this.applyItalicsClass,
    };
    return classes;
  }
}
```

```html
<button class="colorClass boldClass italicsClass" [class.boldClass]='applyBoldClass'>My Button</button>
<br><br>
<button class="colorClass" [ngClass]="addClass()">My Button</button>
// all the classes that is applied in addClass is added 

// if we set false, false class will not be added
```

# Style Binding

```html
  isBold: boolean = true;
  <button style="color: red;" [style.font-weight] = "isBold ? 'bold' : 'normal'">MY button</button>
  <button style="color: red;" [style.fontWeight] = "isBold ? 'bold' : 'normal'">MY button</button>

// can use camel Case will give u similar resuls in the above code


```



```html
export class AppComponent { 
  isBold: boolean = true;
  fontSize: number = 30;
}

<button style="color: red;" [style.font-weight] = "isBold ? 'bold' : 'normal'">MY button</button>
<br>
<button style="color: red;" [style.fontSize.px] = "fontSize">MY button</button> 
```





## One Direction Flow data

1. interpolation
2. property binding
3. Attribute  binding
4. Class Binding
5. Style Binding

# Event Binding

flows data in the opposite direction

```html
<script>
    export class AppComponent { 
         onClick(): void{
            console.log("Button Clicked");
          }
    }
</script>

 <button (click) = 'onClick()'>My Button</button>
 <button on-click = 'onClick()'>My Button</button> // canonical form
 
```

## Hide Details and show details

```javascript
export class EmployeeComponent{
    colSpan: number = 2;
    firstName: string = "Tom";
    lastName: string = "Hopkins";
    gender: string = "Male";
    age: number = 20;
    showDetails: boolean = false;

    toggleDetails(): void {
        this.showDetails = !this.showDetails;
    }
}	
```

```html
<table>
    <thead>
        <tr>
            <th [attr.colspan]="colSpan">
                Employee Details
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>First Name</td>
            <td>{{firstName}}</td>
        </tr>
        <tr>
            <td>Last Name</td>
            <td>{{lastName}}</td>
        </tr>
        <tr *ngIf="showDetails">
            <td>Gender</td>
            <td>{{gender}}</td>
        </tr>
        <tr *ngIf="showDetails">
            <td>Age</td>
            <td>{{age}}</td>
        </tr>
    </tbody>
</table>

<button (click) = 'toggleDetails()'> {{showDetails? 'Hides ': 'Show ' }}Details </button>
```

![image-20201108113831716](https://i.loli.net/2020/11/08/Bg1Kxk6IHRbX78E.png)

# Two Way Data Binding

ex: what ever we enter in to the text box we want to echo it to the browser,  while typing we  need to achieve this behavior

1. from component to HTML

 	2. from HTML element to component

Two Way Data Binding is a combination of property binding and event binding

example 1

```javascript
export class AppComponent { 
  name: string = "Tom"; // value will be stored here
}

```

```html
<input type="text" [value] = 'name' (input) = 'name=$event.target.value'>
<br>
<p>You entered: {{name}}</p> 
```

example 2

```html
export class ServersComponent{
	serverName = ""
	
	
    onUpdateServerName(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
    }
}

        <div class="form-group">
            <label for="serverName"></label>
            <input type="text" name="server" class="form-control"  id="serverName" 
            (input) = "onUpdateServerName($event)"> // passing event data
        </div>
        <p>{{serverName}}</p>
```



## NgModel Directive - short cut for the above behavior

FormsModule must be imported from @angular/forms and must be added to the Import Array

```typescript
import { FormsModule } from '@angular/forms';
@NgModule({  // module decorator (decorators basically modify classes or propert definitions)
  declarations: [
    AppComponent,
    EmployeeComponent, 
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule  // this line must be added if u use Ng-model 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```



```html
<input type="text" [(ngModel)]="name">
<br>
<p>You entered: {{name}}</p>
```

![image-20201109011804078](https://i.loli.net/2020/11/09/JX1MBDqigzOSZv6.png)