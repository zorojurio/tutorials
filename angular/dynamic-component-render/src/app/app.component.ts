import { Component, OnInit } from '@angular/core';
import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';

@Component({
  selector: 'my-app',
  template: `
    <h1>Theme render</h1>
    <ng-template [cdkPortalOutlet]="myPortal"></ng-template>
  `
})
export class AppComponent implements OnInit {
  themes = [0, 1, 2];
  selectedTheme: number;
  myPortal: ComponentPortal<any>;
  readonly components = [
    ChildOneComponent,
    ChildTwoComponent,
    ChildThreeComponent
  ];

  ngOnInit(): void {
    this.selectedTheme = 2;
    console.log(this.components[this.selectedTheme]);
    this.myPortal = new ComponentPortal(this.components[this.selectedTheme]);
  }
}

@Component({
  selector: 'app-child-one',
  template: `
    <p>I am child one.</p>
    <p>{{ title }}</p>
  `
})
export class ChildOneComponent {
  title = 'this is the first theme';
}

@Component({
  selector: 'app-child-two',
  template: `
    <p>I am child two.</p>
    <p>{{ title }}</p>
  `
})
export class ChildTwoComponent {
  title = 'this is the second theme';
}

@Component({
  selector: 'app-child-two',
  template: `
    <p>I am child three.</p>
    <p>{{ title }}</p>
  `
})
export class ChildThreeComponent {
  title = 'this is the third theme';
}
