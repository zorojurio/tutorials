# ngFor Directive

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'list-employee',
    templateUrl: './employee.list.component.html',
    styleUrls: ['./employee.list.component.css']

})

export class EmployeeListComponent {
    employees: any [] = [
        {code: 'emp101', name: 'Tom', gender: 'Male', annualSalary: 5700, dateOfBirth: '25/6/1988'},
        {code: 'emp102', name: 'Chanuka', gender: 'Male', annualSalary: 5780, dateOfBirth: '25/6/1989'},
        {code: 'emp103', name: 'Chathu', gender: 'Male', annualSalary: 5750, dateOfBirth: '25/6/1990'},
        {code: 'emp104', name: 'ranga', gender: 'Female', annualSalary: 5790, dateOfBirth: '25/6/1992'},
    ];
}
```

employee.lis.component.html

```html
<table>
    <thead>
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Annual Salary</th>
            <th>Date of Birth</th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let employee of employees">   // all the data will be displayed as forloop
            <td>{{employee.code}}</td>
            <td>{{employee.name}}</td>
            <td>{{employee.gender}}</td>
            <td>{{employee.annualSalary}}</td>
            <td>{{employee.dateOfBirth}}</td>
        </tr>
        <tr *ngIf="!employees || employees.length==0">
            <td colspan="5">No employees data to display</td>
        </tr>
    </tbody>
</table>
```

app.module.ts

```typescript
import { EmployeeListComponent } from "./employee/employee.list.component";
declarations: [
    AppComponent,
    EmployeeComponent, 
    ProductComponent,
    EmployeeListComponent // new
],
```

app.component.html

```html
<list-employee></list-employee> // employee list data will be rendered here
```

# ngFor Directive trackBy

![image-20201109063822050](https://i.loli.net/2020/11/09/soZRxKMC4Wmh7bP.png)

 NgFor Directive will perform poorly on large data sets. a small change to the list may trigger a casacade of DOM manipulations. (one click will change the whole data set, without tracking)

normally angular doesn't keep track of any objects in a NgFor, In the following code there will be list of employees, same employees will getting refreshed by getEmployees() method. every time we click refresh button, in angular new set of objects will be created. to prevent this from happening we use trackBy. instead of just refreshing in here we check all the employee objects by its employee code. so unnecesary refreshes will be prevented. 

```typescript
export class EmployeeListComponent {
    employees: any [];

    constructor(){
        this.employees = [
            {code: 'emp101', name: 'Tom', gender: 'Male', annualSalary: 5700, dateOfBirth: '25/6/1988'},
            {code: 'emp102', name: 'Chanuka', gender: 'Male', annualSalary: 5780, dateOfBirth: '25/6/1989'},
            {code: 'emp103', name: 'Chathu', gender: 'Male', annualSalary: 5750, dateOfBirth: '25/6/1990'},
            {code: 'emp104', name: 'ranga', gender: 'Female', annualSalary: 5790, dateOfBirth: '25/6/1992'},
        ];
    }

    getEmployees(): void{
        this.employees =  [
            {code: 'emp101', name: 'Tom', gender: 'Male', annualSalary: 5700, dateOfBirth: '25/6/1988'},
            {code: 'emp102', name: 'Chanuka', gender: 'Male', annualSalary: 5780, dateOfBirth: '25/6/1989'},
            {code: 'emp103', name: 'Chathu', gender: 'Male', annualSalary: 5750, dateOfBirth: '25/6/1990'},
            {code: 'emp103', name: 'Hiru', gender: 'Male', annualSalary: 5800, dateOfBirth: '25/6/1990'},
            {code: 'emp104', name: 'ranga', gender: 'Female', annualSalary: 5790, dateOfBirth: '25/6/1992'},
        ];
    }

    trackByEmpCode(index:number, employee:any):string{
        return employee.code;
    }
    
}
```



employee.list.component.html

```html
<table>
    <thead>
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Annual Salary</th>
            <th>Date of Birth</th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let employee of employees; trackBy:trackByEmpCode">
            <td>{{employee.code}}</td>
            <td>{{employee.name}}</td>
            <td>{{employee.gender}}</td>
            <td>{{employee.annualSalary}}</td>
            <td>{{employee.dateOfBirth}}</td>
        </tr>
        <tr *ngIf="!employees || employees.length==0">
            <td colspan="5">No employees data to display</td>
        </tr>
    </tbody>
</table>

<br>
<button (click) = "getEmployees()">Refresh Employees</button>
```

 

## Indexing using NgFor

![image-20201109080134381](https://i.loli.net/2020/11/09/1vkwZFKIEcxfXos.png)

results will be as follows

![image-20201109080447136](https://i.loli.net/2020/11/09/tX8YsV1Eouwaxib.png)

## How to fix index being zero problem

```html
<tr *ngFor="let employee of employees; trackBy:trackByEmpCode; let i=index;">
    <td>{{i+1}}</td> // index always starts with zero by adding one to it we can fix the issue
    <td>{{employee.code | uppercase}}</td>
    <td>{{employee.name}}</td>
    <td>{{employee.gender}}</td>
    <td>{{employee.annualSalary}}</td>
    <td>{{employee.dateOfBirth}}</td>

</tr>
<tr *ngIf="!employees || employees.length==0">
    <td colspan="5">No employees data to display</td>
</tr>
```



## How to get first and last elements of a list 

```html
<tbody>
        <tr *ngFor="let employee of employees; trackBy:trackByEmpCode; let i=index; let isFirst=first; let isLast= last;">
            <td>{{i}}</td>
            <td>{{employee.code}}</td>
            <td>{{employee.name}}</td>
            <td>{{employee.gender}}</td>
            <td>{{employee.annualSalary}}</td>
            <td>{{employee.dateOfBirth}}</td>
            <td>{{isFirst}}</td>
            <td>{{isLast}}</td>
        </tr>
        <tr *ngIf="!employees || employees.length==0">
            <td colspan="5">No employees data to display</td>
        </tr>
    </tbody>
```

in the above code isFirst and isLast will give u either true or false

## 

## Determine index is even or Odd

using odd and even property in ngFor directive

```html
<tbody>
        <tr *ngFor="let employee of employees; trackBy:trackByEmpCode; let i=index; let 					isFirst=first; let isLast= last; let isEven=even; let isOdd=odd">
            <td>{{i}}</td>
            <td>{{employee.code}}</td>
            <td>{{employee.name}}</td>
            <td>{{employee.gender}}</td>
            <td>{{employee.annualSalary}}</td>
            <td>{{employee.dateOfBirth}}</td>
            <td>{{isFirst}}</td>
            <td>{{isLast}}</td>
            <td>{{isEven}}</td>
            <td>{{isOdd}}</td>
        </tr>
        <tr *ngIf="!employees || employees.length==0">
            <td colspan="5">No employees data to display</td>
        </tr>
</tbody>
```

# Angular Pipes

pipes transform data before it is displayed. lets say that we want to convert 

1. employee code to upper case there we will have to use uppercase PIPE. 
2. using $ sign to currency
3. Date changes

![image-20201109084001317](https://i.loli.net/2020/11/09/dbBg9Mfsrm3KLky.png)

```html
<tr *ngFor="let employee of employees; trackBy:trackByEmpCode; let i=index;">
    <td>{{i+1}}</td>
    <td>{{employee.code | uppercase}}</td>
    <td>{{employee.name}}</td>
    <td>{{employee.gender}}</td>
    <td>{{employee.annualSalary | currency:'USD':true:'1.3-3'}}</td> 
        <!-- true: use the symbol ,   -->
        <!-- 1.3-3 > before decimal atleast one digit > 
        after atleast three digits && max of three digits -->
    <td>{{employee.dateOfBirth | date: 'dd/MM/y' | uppercase}}</td>

</tr>
```

![image-20201109084332092](https://i.loli.net/2020/11/09/IoqUYkLlGgAX6SO.png)

## Creating a Custom Class

depending on the gender we add Mr Or Mrs to the employee name

1. Creating the custom pipe
2. declare the custom pipe in the module where u need it
3. Using the custom pipe like any other custom pipe

employeeTitle.pipe.ts

```typescript
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'employeeTitle'
})
export class EmployeeTitlePipe implements PipeTransform{
    // employee.name | employeeTitle:employee.gender
    transform(value:string, gender: string): string{
        if (gender.toLowerCase() == "male"){
            return "Mr. " + value
        }else{
            return "Miss. " + value
        }
    }
}
```

```typescript
import { EmployeeTitlePipe } from "./employee/employeeTitle.pipe";

// default app module creatd by angular 

@NgModule({  // module decorator (decorators basically modify classes or propert definitions)
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeTitlePipe
  ],
```

using the custom pipe

```html
            <td>{{employee.name | employeeTitle:employee.gender }}</td>
```

# Angular Container and Nested Components

## Nested Component & Container Component

![image-20201109111209224](https://i.loli.net/2020/11/09/wfK5YsHUVEmuz4C.png)

1. Creating nested compoent file in a seperate folder
2.  Add the selector directive in the parent component
3. import nested component to the app.component.ts file in the root app directory

```typescript
import { Component } from "@angular/core";

@Component({
    selector: 'employee-count', // will be included in employeeList.component.html
    templateUrl: './employeeCount.component.html',
    styleUrls: ['./employeeCount.component.css'],
})


export class EmployeeCountComponent {
    all:number = 10;
    male:number = 5;
    female:number = 5;
}
```

in employeeList.component.html

```html
<employee-count></employee-count>  		
```

 importing the necessary nested components

```typescript
import { EmployeeCountComponent } from "./employee/employeeCount/employeeCount.component";


@NgModule({  // module decorator (decorators basically modify classes or propert definitions)
  declarations: [
    AppComponent,
    EmployeeComponent, 
    ProductComponent,
    EmployeeListComponent,
    EmployeeTitlePipe,
    EmployeeCountComponent
  ],
 })
```



## Angular Component Input Properties

![image-20201109122524027](https://i.loli.net/2020/11/09/KuwCSeoAaHJhZD8.png)



### == operators 

![image-20201109122900723](https://i.loli.net/2020/11/09/kTHf3C2c8QbEBRL.png)

![image-20201109135355545](https://i.loli.net/2020/11/09/LUxbMSv2fYCNk1t.png)



## Angular Component OutPut Properties



```typescript
import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'employee-count',
    templateUrl: './employeeCount.component.html',
    styleUrls: ['./employeeCount.component.css'],
})


export class EmployeeCountComponent {
    selectedRadioButtonValue: string = "All";
    
    @Output() // to turn countRadioButtonSelectedChanged to an event this is used
    countRadioButtonSelectedChanged: EventEmitter<string> = new EventEmitter<string>();
    // create custom event EventEmitter whose event data is of type string (value of radio is str)
    // event data = event payload
    @Input() all:number;
    @Input() male:number;
    @Input() female:number;
    
    onRadioButtonSelectedChange(){
        this.countRadioButtonSelectedChanged.emit(this.selectedRadioButtonValue); 
        // emit method raise the custom event
        console.log(this.selectedRadioButtonValue);
        
    }
    
}
```



employeeCount.Component.html

```html
<span class="radioSelect">Show: </span>

<input type="radio" name="options" id="allCountId" value="All" 
[(ngModel)]="selectedRadioButtonValue" (change) = "onRadioButtonSelectedChange()">
<label class="radioSelect" for="allCountId">{{"All(" + all + ")" }}</label>

<input type="radio" name="options" id="maleCountId" value="male"
[(ngModel)]="selectedRadioButtonValue" (change) = "onRadioButtonSelectedChange()">
<label class="radioSelect" for="maleCountId">{{"Male(" + male + ")" }}</label>

<input type="radio" name="options" id="femaleCountId" value="female"
[(ngModel)]="selectedRadioButtonValue" (change) = "onRadioButtonSelectedChange()">
<label class="radioSelect" for="femaleCountId">{{"Female(" + female + ")" }}</label>
```

in the above example console log will out put, the selected radio buttons value



## Passing selected Radio Button Value to the parent component.



```javascript
seletedEmployeeCountRadioButton: string = "All";

onEmployeeCountRadioButtonChanged(selectedRadioButtonValue: string): void{
    this.seletedEmployeeCountRadioButton = selectedRadioButtonValue
    console.log(this.seletedEmployeeCountRadioButton);

}
```

```html
<employee-count [all]="getTotalEmployeeCount()" 
                [male]="getTotalMaleEmployeeCount()"
                [female]="getTotalFemaleEmployeeCount()" 
                (countRadioButtonSelectedChanged)="onEmployeeCountRadioButtonChanged($event)">
</employee-count>



<ng-container *ngFor="let employee of employees; let i=index;">

      <tr *ngIf="seletedEmployeeCountRadioButton=='All' || 						    seletedEmployeeCountRadioButton==employee.gender">
            <td>{{i+1}}</td>
            <td>{{employee.code | uppercase}}</td>
            <td>{{employee.name | employeeTitle:employee.gender }}</td>
            <td>{{employee.gender}}</td>
            <td>{{employee.annualSalary | currency:'USD':true:'1.3-3'}}</td>
            <!-- true: use the symbol ,   -->
            <!-- 1.3-3 > before decimal atleast one digit > 
                    after atleast three digits && max of three digits -->
            <td>{{employee.dateOfBirth | date: 'dd/MM/y' | uppercase}}</td>

      </tr>
</ng-container>
```

 

