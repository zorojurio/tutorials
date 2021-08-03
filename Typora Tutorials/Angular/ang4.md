# How to pass data from a component to another component

Start Project 

```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  serverElements = [{type: 'server', name: 'test server', content: 'newkamna'}];
}

```

cockpit.ts

```typescript
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})

export class CockpitComponent implements OnInit {

  newServerName = '';
  newServerContent = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  onAddServer() { 
    // this.serverElements.push({
    //   type: 'server',
    //   name: this.newServerName,
    //   content: this.newServerContent
    // });
  }

  onAddBlueprint() {
    // this.serverElements.push({
    //   type: 'blueprint',
    //   name: this.newServerName,
    //   content: this.newServerContent
    // });
  }
}

```

```html
<div class="row">
  <div class="col-xs-12">
    <h3> Add new Servers or blueprints!</h3>
    <label for="serverName">Server Name</label>
    <input id="serverName" type="text" class="form-control" [(ngModel)]="newServerName">
    <label for="serverContent"  >Server Content</label>
    <input id="serverContent" type="text" class="form-control" [(ngModel)]="newServerContent">
    <br>

    <button
      class="btn btn-success mr-2"
      (click)="onAddServer()">Add Server
    </button>

    <button
      class="btn btn-primary"
      (click)="onAddBlueprint()">Add Server Blueprint
    </button>

  </div>
</div>
```

server.component.ts

```typescript
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})

export class ServerElementComponent implements OnInit {
  @Input() element: { type: string, name: string, content: string }; 
    // getting the for lop object
    // render as seperate elements

  constructor() {

  }

  ngOnInit(): void {
  }

}

```

```html
<div class="row">
  <div class="col-12">
    <div
      class="card mt-2">
      <div class="card-header">{{ element.name }}</div>
      <div class="card-body">
        <p>
          <strong *ngIf="element.type === 'server'" style="color: red">{{ element.content }}</strong>
          <em *ngIf="element.type === 'blueprint'" style="color: blue">{{ element.content }}</em>
        </p>
      </div>
    </div>
  </div>
</div>
```



Main HTML

```html
<div class="container">
  <app-cockpit></app-cockpit>
  <hr>

  <div class="row">
    <div class="col-12">
      <app-server-element *ngFor="let serverElement of serverElements" [element]="serverElement">

      </app-server-element>
    </div>
  </div>
</div>
```



## Using Alias to custom properties

```html
  <div class="row">
    <div class="col-12">
      <app-server-element *ngFor="let serverElement of serverElements" [srvElement]="serverElement">
      </app-server-element>
    </div>
  </div>
  
  
  
export class ServerElementComponent implements OnInit {
  @Input('srvElement') element: { type: string, name: string, content: string };

  constructor() {

  }

  ngOnInit(): void {
  }

}

```



## Sending data from child component to parent component

inside app-cockpit when an event is occured, it is stored in either serverCreated or blueprintCreated. 

```html
<div class="container">
  <app-cockpit
    (serverCreated)="onServerAdded($event)"
    (blueprintCreated)="onBluePrintAdded($event)">

  </app-cockpit>
<!--  listen to the event severCreated  
once the event is occured  execute the this code-->
  <hr>

  <div class="row">
    <div class="col-12">
      <app-server-element *ngFor="let serverElement of serverElements" [srvElement]="serverElement">
      </app-server-element>
    </div>
  </div>
</div>

```



app component ts

```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  serverElements = [{type: 'server', name: 'test server', content: 'newkamna'}];

    // getting the event data from the custom event and create new server elements
  onServerAdded(serverData: {serverName: string, serverContent: string}){
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }



  onBluePrintAdded(blueprintData: {serverName: string, serverContent: string}){
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }

}
```

```typescript
import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})

export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output() blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  // <> uses generic type
  // inside <> define the event data types that u are going to emit
  // at the end use () to call the constructor to create a new EventEmitter Obj
  // finally store it in the serverCreated

  newServerName = '';
  newServerContent = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  onAddServer() {
      // sending event data when user clicks onAddServer()
    this.serverCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent
    });
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent
    });
  }
}
```



1. User is clicking Add server Button

2. onAddServer() event is triggered.

3. getting data from ngModel and storing it in newServerName & newServerContent

4. as soon as the data is stored serverCreated Event object is created

5. then data received from MgModel is emitted by serverCreated 

6. as soon as serverCreated emits data it is again getting captured by onServerAdded in app component and sends data to app.component.ts (here we are sending data from child element to parent element > out put is used) - 

7. Then the data captured by onServerAdded will push data to the c list

8. Then again in the app.components.html serverElements will be looped (ngFor is used to loop data)

9. serverElementsItem (one item of the loop) will be rendered in to server.element.ts (Here we are sending data from parent element to the child element > input is used)

10. there  server.element.ts does not know the type of serverElementsItem. 

11. ```
    @Input('srvElement') element: { type: string, name: string, content: string };
    ```

    srvElement > is the variable we use in app.component to define serverElementsItem  data

    element >  is used server.element.html to represent the serverElementsItem  data received from app component

# View Encapsulation

css files that is belong to one compoent will only affect that compoent only. this is angular behaviour 

```css
p[ang_gen_file] {
	color: blue ;
}
```

it gives unique attribute name to the each component element



```
@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
```



1. ViewEncapsulation.Emulated > default encapsulation

2. ViewEncapsulation.None > no encap (one CSS affect the whole web -page)

3. ViewEncapsulation.Native > uses shadow DOM

   

### shadow DOM >  

is a technology use by some browsers it gives u the default encapsulation of angular. however some browsers does not support shadow DOM technology

# Using Local reference in Templates

Local reference is a reference to a particular element.  so we can pass local reference as an argument of a function. we can use references **only in our web template** but not in our typescript files. 

```html
<input id="serverName" type="text" class="form-control" #serverNameInput>
<label for="serverContent"  >Server Content</label>
<input id="serverContent" type="text" class="form-control" [(ngModel)]="newServerContent">
<br>

<button
  class="btn btn-success mr-2"
  (click)="onAddServer(serverNameInput)">Add Server
</button>
```

serverNameInput is used as an argument. so we can access it in TS file as an argument

```typescript
onAddServer(serverInput) {
  console.log(serverInput)
  this.serverCreated.emit({
    serverName: this.newServerName,
    serverContent: this.newServerContent
  });
}
```

serverInput >  is the argument passed in as the local reference in the above template.

serverInput  contains all the property values belong to INPUT text element. so we can use like this

```typescript
onAddServer(serverInput) {
  console.log(serverInput.value) // accessing attributes of the input element
  this.serverCreated.emit({
    serverName: this.newServerName,
    serverContent: this.newServerContent
  });
}
```

## 

## Using Local reference for Two way data Binding

```html
<input id="serverName" type="text" class="form-control" #serverNameInput>
<label for="serverContent"  >Server Content</label>
<input id="serverContent" type="text" class="form-control" [(ngModel)]="newServerContent">
<br>
    <p>{{serverNameInput.value}}</p>   
<button
  class="btn btn-success mr-2"
  (click)="onAddServer(serverNameInput)">Add Server
</button>
```

when we click Add Server button, what we have entered in the input element. will be displayed as the output



## Using local reference as HTMLInputElements

```html
<input id="serverName" type="text" class="form-control" #serverNameInput>
<label for="serverContent"  >Server Content</label>
<input id="serverContent" type="text" class="form-control" [(ngModel)]="newServerContent">
<br>
    <p>{{serverNameInput.value}}</p>
<button
  class="btn btn-success mr-2"
  (click)="onAddServer(serverNameInput)">Add Server
</button>

<button
  class="btn btn-primary"
  (click)="onAddBlueprint(serverNameInput)">Add Server Blueprint
</button>
```



```typescript
onAddServer(serverInput: HTMLInputElement) { // since we know the type is INPUT element
  console.log(serverInput.value)
  this.serverCreated.emit({
    serverName: serverInput.value, // accessing the value attribute f teh einput element
    serverContent: this.newServerContent
  });
}

  onAddBlueprint(serverInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: serverInput.value,
      serverContent: this.newServerContent
    });
  }

```

# Getting access to the Template and DOM using ViewChild

local reference in the HTML

```html
<!--    <input id="serverContent" type="text" class="form-control" [(ngModel)]="newServerContent">-->
<input id="serverContent" type="text" class="form-control"
       #serverContentinput>
<br>
```

accessing local reference and store it in a property using view child

```typescript
import {Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@ViewChild('serverContentinput') serverContentinput: ElementRef;

onAddServer(serverInput: HTMLInputElement) {

  // nativeElement is used to get access to underlying elents
  this.serverCreated.emit({
    serverName: serverInput.value,
    serverContent: this.serverContentinput.nativeElement.value
  });
}

onAddBlueprint(serverInput: HTMLInputElement) {
  this.blueprintCreated.emit({
    serverName: serverInput.value,
    serverContent: this.serverContentinput.nativeElement.value
  });
}
```



Good practices of VIEW CHILD decorator



```typescript
this.serverContentinput.nativeElement.value = "something"
```

This will change the DOM but we don't use this to change DOM. because there are better ways

# NG-Content

angular will ignore the code, between the selector tag in HTML template, that is the default behavior

```html
<app-server-element *ngFor="let serverElement of serverElements" [srvElement]="serverElement">
  <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
  <em *ngIf="serverElement.type === 'blueprint'" style="color: blue">{{ serverElement.content }}</em>
</app-server-element>

<-- code with in app-server-element will not work by default -->
```

however we can change this default behavior, by using Ng Content.

```html
<div class="row">
  <div class="col-12">
    <div
      class="card mt-2">
      <div class="card-header">{{ element.name }}</div>
      <div class="card-body">
        <p>
          <ng-content>
			<!--code with in app-server-element will be projected here--> 
           </ng-content>
        </p>
      </div>
    </div>
  </div>
</div>
```

lets say that u want to use the above content, in multiple places but with different logics. in this case we can use, ng-content (reusable widget)



# Understanding the Component Life Cycle

ngOnInit is a life cycle hook. if a new component is created in angular, after finding one of the selectors, it will instantiate a new version of that particular component and add it in to the DOM.

when instantiating new components angular is going through different phrases. meantime it allows us to hook in to these phases and execute some code by implementing methods

## ngOnChanges

```
this executes multiple times, first when new component is created, thereafter it calls whenever bound input property changes, properties decorated with @Input, means these properties receive new values. 
```

## ngOnInit

```
this method gets executed once the component has been initialized. before it ias added to the DOM this is executed. ngOnInit will run after the constructor.
```

## ngDOCheck

```
when something change in the template, this is getting executed, on every check angular makes this will check the code and ngDOCheck will be executed
```

## ngAfterContentInit

```
called after ng-content has been projected in to the view. 
```

## ngAfterContentChecked

```
called everytime projected component, has been checked
```

## ngAfterViewInit

```
once the view of our own component and child component has been finished initializing 
```

## ngAfterViewChecked

```
once the view of our own component and child component has been Checked
```

## ngOnDestroy

```
calls once the component be about to be destroyed
```

Here is the sequence

![image-20201116174619252](https://i.loli.net/2020/11/16/lK8YxpnAwyzt16I.png)

```html
<div class="container">
  <app-cockpit
    (serverCreated)="onServerAdded($event)"
    (bpCreated)="onBluePrintAdded($event)">

  </app-cockpit>
  <!--  listen to the event severCreated  once the event is occured  execute the this code-->
  <hr>

  <div class="row">
    <div class="col-12">
      <button class="btn btn-primary" (click)="onChangeFirst()">Change First Element</button>
      <button class="btn btn-danger" (click)="onDestroyFirst()">Destroy First Element</button>
      <app-server-element *ngFor="let serverElement of serverElements" [srvElement]="serverElement"
      [name] = "serverElement.name"
      >
        <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
        <em *ngIf="serverElement.type === 'blueprint'" style="color: blue">{{ serverElement.content }}</em>
      </app-server-element>
    </div>
  </div>
</div>
```

app component

```typescript
onChangeFirst() {
  console.log('changed');
  this.serverElements[0].name = 'Changed';
}

onDestroyFirst(){
  this.serverElements.splice(0, 1);
}
```



server component

```typescript
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
})

export class ServerElementComponent implements OnInit, OnChanges, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input('srvElement') element: { type: string, name: string, content: string };
  @Input() name: string;

  constructor() {
    console.log('Constructor is called');
  }

  ngOnInit(): void {
    console.log('ngOnInit is called');
  }

  ngOnChanges(changes: SimpleChanges): void { // recieves args
    console.log('ngOnChanges called');
    console.log(changes); // print the changes did occur
  }

  ngDoCheck(): void {
    console.log('ngDoCheck is called');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

}
```



## local reference in the HTML will not be able to access inOnInit and it is only be able to access once the view template is loaded

1. define local reference in HTML

   ```html
   <div class="card-header" #heading>{{ name }}</div>
   <div class="card-body">
     <p>
       <ng-content></ng-content>
     </p>
   </div>
   ```

2. import ViewChild and define it then access it in ngOnInit and ngAfterViewInit

   ```typescript
   @ViewChild('heading') header: ElementRef;
   
     ngOnInit(): void {
       console.log('ngOnInit is called');
       console.log('text Content' + this.header.nativeElement.textContent); // undefined error
     }
     
      ngAfterViewInit(): void {
       console.log('ngAfterViewInit');
       console.log('text Content' + this.header.nativeElement.textContent);  
   	// will print the value of the header to the console 
     }
   ```

   # Accessing the local reference in parent html from child component

   ```html
    <app-server-element *ngFor="let serverElement of serverElements" [srvElement]="serverElement"
                             [name]="serverElement.name">
           <p #contentParagraph>
             <strong *ngIf="serverElement.type === 'server'" style="color: red">
             {{ serverElement.content }}</strong>
             <em *ngIf="serverElement.type === 'blueprint'" style="color: blue">
             {{ serverElement.content }}</em>
           </p>
   </app-server-element>
   ```

```typescript
@ContentChild('contentParagraph') paragraph: ElementRef;
```

```typescript
ngAfterContentInit(): void {
  console.log('ngAfterContentInit');
  console.log('Paragraph content' + this.paragraph.nativeElement.textContent);
}
```