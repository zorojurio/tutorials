# Directives

directives are instructions in the DOM.

1. Structural Directives > Add or remove elements. and they change the structure of the DOM around this element.  this uses a star
   1. ngIF 
   2. ngFor
2. Attribute elements > Change the element that they were placed on. sit on elements just like attributes

![image-20201110224013469](https://i.loli.net/2020/11/11/KgSEFwI3LCvjYNe.png)

 

## NgIF Directive > show the element only if the expression is true

```html
  serverCreated = false;

<p *ngIf="serverCreated; else noServer">Server was created, server name is {{serverName}}</p>
<ng-template #noServer>
  <p>
    No Server was created
  </p>
</ng-template>
```



in the above example if serverCreated is set to true, paragraph is rendered, otherwise #noServer will be rendered.



## NgStyle Directive > takes dictionary as argument

```javascript
export class AppComponent { 
  isBold: boolean = true;
  fontSize: number = 30;
  isItalic: boolean = true;

  addStyles(){
    let styles = {
      'font-size.px' : this.fontSize,
      'font-weight': this.isBold ? 'bold' : 'normal',
      'font-style': this.isItalic ? 'italic' : 'normal',
    };
    return styles;
  }
}

<button style="color: rebeccapurple;" [ngStyle]="addStyles()">Thunder Breething</button>
```

# Custom Directive

## 	Normal way

here we are going to create a custom directive  (basic-highlight/ basic-highlight.directive.ts)

```typescript
import {Directive, ElementRef, OnInit} from '@angular/core';


@Directive({
  selector: '[appBasicHighLight]',
})

export class BasicHighlightDirective implements  OnInit{
  constructor(private elementRef: ElementRef) {
  }
  ngOnInit(): void {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }

}
```

then we register it in the apps module

```typescript
import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive'

@NgModule({  // module decorator (decorators basically modify classes or propert definitions)
  declarations: [
    AppComponent, BasicHighlightDirective
  ],
```

Then we use the custom directive in the HTML template

```html
<p appBasicHighLight >Hello </p>
```

so in here when we use this directive, it will add style background to green. 

## Using the Renderer to build a Better Attribute Directive

when we don't have access to the DOM of the web page, this method is useful, specially when it comes to services this is the best approach when creating custom directives. without renderer it will give u an error.

better-highlight/ better-highlight.directive.ts

```typescript
import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue');
  }

}
```

setting it in the app module

```typescript
import { BetterHighlightDirective } from './better-highlight/better-highlight.directive';

@NgModule({  // module decorator (decorators basically modify classes or propert definitions)
  declarations: [
    AppComponent, BasicHighlightDirective, BetterHighlightDirective
  ],
```

use the custom directive in the HTML template

```html
<div class="col-12">
  <p appBasicHighLight >Hello </p>
  <p appBetterHighlight >Hello </p>
</div>
```

## Using HostListener to Listen to Host Events.

so in here, directives are used with EVENTS, here HostListener is used. 

```typescript
import {Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
  }

    // when the mouse hover to the element this event will occur
  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue');
  }

    // when the mouse hover off this event will occur
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'transparent');
  }

}
```

## 

##  Using HostBinding to Bind to Host Properties.

```typescript
import {Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})

export class BetterHighlightDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor = 'transparent';

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = 'blue';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = 'transparent';
  }
}
```



## Custom Directive Properties

```typescript
import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor = 'transparent';
  @Input() defaultColor = 'transparent'; // in the HTML component this can be overrided
  @Input() highlightColor = 'blue';

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
  }

  @HostListener('mouseenter') mouseover = (eventData: Event) => {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave = (eventData: Event) => {
    this.backgroundColor = this.defaultColor;
  }
}
```

```html
<div class="col-12">
  <p appBasicHighLight  >Hello </p>
  <p appBetterHighlight [defaultColor]="'yellow'" [highlightColor]="'red'" >Hello </p>
</div>
```

## Custom Directive Properties with Alias

```typescript
import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor = 'transparent';
  @Input() defaultColor = 'transparent';
  @Input('appBetterHighlight') highlightColor = 'blue';

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
  }

  @HostListener('mouseenter') mouseover = (eventData: Event) => {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave = (eventData: Event) => {
    this.backgroundColor = this.defaultColor;
  }


}
```

```typescript
<div class="col-12">
  <p appBasicHighLight  >Hello </p>
  <p [appBetterHighlight]="'red'" [defaultColor]="'yellow'" >Hello </p>
</div>
```

# Structural Directive

​	'*' in Structural directives

```html
<!--following codes are exactly same-->
<div *ngIf="!onlyOdd">
  <li class="list-group-item" *ngFor="let even of evenNumbers"
      [ngClass]="{odd: even % 2 !== 0}"> {{even}} </li>
</div>

<!--the above code will be transformed in to the following code-->
<ng-template [ngIf]="!onlyOdd">
  <div>
    <li class="list-group-item" *ngFor="let even of evenNumbers"
        [ngClass]="{odd: even % 2 !== 0}"> {{even}} </li>
  </div>
</ng-template>
```

# Structural Directive Custom 

```typescript
import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  // when ever input parameter changes, executes a method this still is a property it is a setter of the property, which is a method which get executed whenever the property changes (outside the directive )
  @Input() set appUnless(condition: boolean) {
    if (!condition) { // given condition in the template
      this.vsRef.createEmbeddedView(this.templateRef);
      // creates a view in this view container using the given template
    } else {
      this.vsRef.clear();
    }
  }
  // ElementRef allows us to access Elements templateRef allows us to access Templates second parameter is view container where should we render it. which marks the place where, we put the directive in the document
  constructor(private templateRef: TemplateRef<any>, private vsRef: ViewContainerRef) {
  }

}
```

```typescript
import { UnlessDirective } from './unless/unless.directive';

@NgModule({  // module decorator (decorators basically modify classes or propert definitions)
  declarations: [
    AppComponent, BasicHighlightDirective, BetterHighlightDirective, UnlessDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule
  ],
```

```html
<div class="col-12 my-2">
  <ul class="list-group">
    <div *ngIf="onlyOdd">
      <li class="list-group-item" *ngFor="let odd of oddNumers"
          [ngClass]="{odd: odd % 2 !== 0}"> {{odd}} </li>
    </div>
    <div *appUnless="onlyOdd">
      <li class="list-group-item" *ngFor="let even of evenNumbers"
          [ngClass]="{odd: even % 2 !== 0}"> {{even}} </li>
    </div>

  </ul>
</div>
```

# ngSwitch

value in the app component is 100

```html
<div class="col-12" [ngSwitch]="value">
  <p *ngSwitchCase="5">value is 5</p>
  <p *ngSwitchCase="10">value is 10</p>
  <p *ngSwitchCase="100">value is 100</p> // this will be the output
  <p *ngSwitchDefault>value is Defaule</p>
</div>
```

# Custom Dropdown Directive

```typescript
import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: 'appDropDown'
})
export class DropdownDirective {
  private wasInside = false;
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }


  constructor() {
  }

}
```

```html
<div class="col-12">

  <div class="dropdown " >
    <button class="btn btn-secondary dropdown-toggle" type="button"
            data-toggle="dropdown"
            aria-haspopup="true"  appDropdown
    #r="appDropDown">
      Manage Recipe
    </button>
      <!-- adding the show class based on the directives -->
    <div class="dropdown-menu"   [ngClass]="{'show':r.isOpen}" >  
      <a class="dropdown-item" href="#">To Shopping List</a>
      <a class="dropdown-item" href="#">Edit Recipe</a>
      <a class="dropdown-item" href="#">Delete Recipe</a>
    </div>
  </div>

</div>
```