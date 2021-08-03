# Routes

determine which component belongs to which URL

app module

```typescript
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UserComponent},
  {path: 'servers', component: ServersComponent}
];

  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
      
         // <router-outlet></router-outlet> 
      // all the routed component will be displayed here witha  seperate URL
```

# Implement Navigation

```html
<div class="col-12">
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link active" routerLink="/">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" routerLink="/servers">Servers</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" [routerLink]="'/users'" > Users</a>
    </li>
  </ul>
</div>
```

routerLink="/servers" > absolute path

routerLink="servers"  > relative path >  append servers to the current path

routerLink="../servers"  >

# Programmic Navigation

## Navigating from buttons

```html
<button class="btn btn-primary" (click)="onLoadServers()">Load Servers</button> 
```

```typescript
onLoadServers(){
  this.router.navigate(['/servers']); // without refreshing now it goes to servers
}
```

## 

## Programmic relative navigation

```typescript
constructor(private serversService: ServersService,
            private router: Router,
            private route: ActivatedRoute) { 
    // getting the information about currently activated route
}

ngOnInit() {
  this.servers = this.serversService.getServers();
}

onReload() {
  // this.router.navigate(['servers'], {relativeTo: this.route}); will give error
  // current URL + servers URL
  // unlike routerLinkActiveOptions navigate doesnt know which path they are in
}
```

## passing arguments to Route

```typescript
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/:id', component: UserComponent},  // subcomponent of users 
    // so will render only the subcomponent part of the browser
  {path: 'servers', component: ServersComponent}
];

```

## Fetching Router Parameters

(http://localhost:4200/users/1/max

```typescript
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/:id/:name', component: UserComponent},
  {path: 'servers', component: ServersComponent}
];
```

```typescript
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // when initializing we are getting the user
    this.user = {
      id: this.route.snapshot.params.id,
      name: this.route.snapshot.params.name,
    };
  }

}
```

```html
<p>User with ID {{user.id}} loaded.</p>
<p>User name is {{user.name}} sdf</p>
```



## Fetching Route Parameters Reactively

when we load a new route, angular goes to app module and find the fitting route, then loads the component and initialize the component and gives us the data by accessing the snapshot. that only happens if we havent been on that component before. 

when we are already on that component it is not creating from the begging, so only the URL changes but not the user objects. 

```typescript
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: { id: number, name: string };

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    // when initializing we are getting the user
    this.user = {
      id: this.route.snapshot.params.id,
      name: this.route.snapshot.params.name,
    };
    // asynchronosly URL is changed, in ordre to change element as we are currently in the same component.
    // we have to listen ti URL changes

    this.route.params.subscribe(
      (params: Params ) => { // execute this when parameter changes
        this.user.id = params.id;
        this.user.name = params.name;
      }
    );
	// Param observable is fired, then URL changes then update user objects	
  }

}
```

dont need to use above method when u are 100% instantiating the component. 

## Behavior of observable

after instantiating the component, and when u leave that page, component is also getting destroyed, however if we specify a custom observable here, it will remain in the memory, we ll have to manually desctroy it. using OnDestroy method. however observables developed by angular we dont have to destroy it manually, because angular is taking care of that process. 

how to do it manually.

```typescript
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, name: string };
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    // when initializing we are getting the user
    this.user = {
      id: this.route.snapshot.params.id,
      name: this.route.snapshot.params.name,
    };
    // asynchronosly URL is changed, in ordre to change element as we are currently in the same component.
    // we have to listen ti URL changes

    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => { // execute this when parameter changes
        this.user.id = params.id;
        this.user.name = params.name;
      }
    );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    // unsubscribing paramSubscription is not neccessary, cz angular is taking care of it
  }

}
```

# Query Parameters and Fragments.

these are the parameters separated by question marks.@ & and # fragments

ex: http://localhost:4200/servers/1/edit?allowEdit=1#loading

```html
<div class="col-5">

  <div class="list-group">
    <a
      [routerLink]="['/servers', 5, 'edit']"
      [queryParams]="{allowEdit: '1', notAllow:'2'}"
      [fragment]="'loading'"
      href="#"
      class="list-group-item"
      *ngFor="let server of servers">
      {{ server.name }}
    </a>
  </div>
</div>
```

### Programmatically 

```typescript
onLoadServers(id: number){
  this.router.navigate(['/servers', id, 'edit'],
    {
      queryParams: {allowEdit: '1'},
      fragment: 'loading'
    }  );
}
```

## Retrieve Query parameters and Fragments

```typescript
ngOnInit() {
  console.log(this.route.snapshot.queryParams);
  console.log(this.route.snapshot.fragment);
  this.route.queryParams.subscribe();
  this.route.fragment.subscribe();
    
  this.server = this.serversService.getServer(1);
  this.serverName = this.server.name;
  this.serverStatus = this.server.status;
}
```

## Example

```typescript
import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id;
    this.server = this.serversService.getServer(id);
    this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params.id);
      }
    );
  }

}
```

```html
<div class="row mt-5">
  <div class="col-12">
    <div class="list-group">
      <a
        [routerLink]="['/users', user.id, user.name]"
        href="#" class="list-group-item"
        *ngFor="let user of users">
        {{ user.name }}
      </a>
    </div>

  </div>

  <div class="col-12 mt-5">

    <app-user></app-user>

  </div>
</div>
```

# Child/ Nested Routes

```typescript
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent},
    ]
  },

  {
    path: 'servers', component: ServersComponent, children: [
      {path: ':id/edit', component: EditServerComponent},
      {path: ':id', component: ServerComponent},
    ]
  },

];
```

server component html

```html
<div class="row mt-5">
  <div class="col-4">

    <div class="list-group">
      <a
        [routerLink]="['/servers', server.id]"
        [queryParams]="{allowEdit: server.id === 3 ? '1': '0'}"
        [fragment]="'loading'"
        href="#"
        class="list-group-item"
        *ngFor="let server of servers">
        {{ server.name }}
      </a>
    </div>
  </div>

  <div class="col-8">
    <router-outlet></router-outlet>
  </div>
</div>
```

user component html

```html
<div class="row mt-5">
  <div class="col-6">
    <div class="list-group">
      <a
        [routerLink]="['/users', user.id, user.name]"
        href="#" class="list-group-item"
        *ngFor="let user of users">
        {{ user.name }}
      </a>
    </div>

  </div>

  <div class="col-6">
	sub routes will be rendered here.
    <router-outlet></router-outlet>

  </div>
</div>
```

# Configuring the Handling of Query Parameters

```html
<h5>{{ server.name }}</h5>
<p>Server status is {{ server.status }}</p>

<button class="btn btn-warning mt-2" (click)="onEdit()">Edit Server</button>
```

edit server component

```typescript
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  constructor(private serversService: ServersService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams.allowEdit === '1' ? true: false;
          // getting the data from the query parameter allowEdit
      }
    );
    this.route.fragment.subscribe();
    const id = this.route.snapshot.params.id;
    console.log(id);
    this.server = this.serversService.getServer(+id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }
```

based on the data which was stored in the allowEdit > the following ngIf conditions are used and data will be rendered accordingly. 

```html
<h4 *ngIf="!allowEdit"> You Are not allowed</h4>
<div *ngIf="allowEdit">
  <div class="form-group">
    <label for="name">Server Name</label>
    <input
      type="text"
      id="name"
      class="form-control"
      [(ngModel)]="serverName">
  </div>

  <div class="form-group">
    <label for="status">Server Status</label>
    <select
      id="status"
      class="form-control"
      [(ngModel)]="serverStatus">
      <option value="online">Online</option>
      <option value="offline">Offline</option>
    </select>
  </div>
  <button
    class="btn btn-primary"
    (click)="onUpdateServer()">Update Server
  </button>
</div>
```

# Outsourcing the route configuration

create the routes in a seperate file and configure it back to the app module file. 

```typescript
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user/user.component';
import {ServersComponent} from './servers/servers.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {ServerComponent} from './servers/server/server.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent},
    ]
  },

  {
    path: 'servers', component: ServersComponent, children: [
      {path: ':id/edit', component: EditServerComponent},
      {path: ':id', component: ServerComponent},
    ]
  },
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'} // make sure that this is the last route

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule] // sending the configured router module
    // in the app module u have to import this and add to the import section
})
export class AppRoutingModule {
}
```

# Guards. 

route guards. basically code  is executed before the route is loaded. or once u want to leave the route. 

giving editing access to the users who are logged in can be taken as an example. 

we can achieve this behavior by adding the logic to the onInit part however as u add more component tot the project. u ll have to do this manually. that is why guards came in to action. 

1. creating the file AUTH guard service. 

A **promise** is a **TypeScript** object which is used to write asynchronous programs. A **promise** is always a better choice when it comes to managing multiple asynchronous operations, error handling and better code readability



for fat arrow functions => [Fat Arrow Functions • Angular (codecraft.tv)](https://codecraft.tv/courses/angular/es6-typescript/arrow/)



## How to Create Promise?

A TypeScript promise takes inner function, and that inner function accepts resolve and rejects parameter. If we talk about Promise, so it works the same way we make promises to others. In a real-world scenario, when we make a promise to somebody that means the surety of doing something in the future. TypeScript promise holds the future value either it will return success or gets rejected.

When you execute a task *synchronously*, you wait for it to finish before moving on to the next line of code. When you execute a task *asynchronously*, the program moves to the next line of code before the task finishes.

You can see in the example below, how to define Promise, declare Promise with new operator instance and pass resolve and reject parameter within the inner function in the Promise object.

```typescript
var promise = new Promise((resolve, reject) => {
});
```

We pass to Promise an inner function that takes two arguments `(resolve, reject)`.

Since we are defining the function we can call these arguments whatever we want but the convention is to call them `resolve` and `reject`.

`resolve` and `reject` are in fact functions themselves.



auth service

```typescript
export class AuthService {
  loggedIn = false;

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
            resolve(this.loggedIn);
        }, 800);
      });
    console.log(promise);
    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
```

auth guard service

```typescript
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          if (authenticated) {
            return true;
          } else {
            this.router.navigate(['/']);
          }
        }
      );
  }

}
```

injecting it to the app routing

```typescript
{
  path: 'servers', canActivate: [AuthGuardService], component: ServersComponent, children: [
    {path: ':id/edit', component: EditServerComponent},
    {path: ':id', component: ServerComponent},
  ]
},
```

finally adding it to the providers in the app module

```typescript
providers: [ServersService, AuthGuardService, AuthService],
bootstrap: [AppComponent]
```

# when user make changes then accidentally click discard. How to prevent the page being loaded

```typescript
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
  // only the declaration of the canDeactivate
}

//CanDeactivate if all guards return true  navigation continues, if any guard return false navaigation in cancelled
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> |
    boolean {
    return component.canDeactivate(); // calling the canDeactivate the method we are currently on
  }
}
```

adding it to the app routin

```typescript
{
  path: 'servers', canActivateChild: [AuthGuardService], component: ServersComponent, children: [
    {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuardService]},
    {path: ':id', component: ServerComponent},
  ]
},
```

adding it to the providers of the app module

```typescript
  providers: [ServersService, AuthGuardService, AuthService, CanDeactivateGuardService],
```

implement the CanDeactivateGuardService to the component that we are looking forward to use. 

```typescript
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams.allowEdit === '1' ? true : false;
      }
    );
    this.route.fragment.subscribe();
    const id = this.route.snapshot.params.id;
    console.log(id);
    this.server = this.serversService.getServer(+id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {
      relativeTo: this.route,
      queryParams: {allowEdit: '1'},
      fragment: 'loading'
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) 
        && !this.changesSaved){
      return confirm('Do you want to discard the changes ? ');
    }else{
      return true;
    }
  }

}
```

# passing static data to a route

```typescript
{path: 'not-found', component: ErrorPageComponent, data: {message: '403 not Authorized'}},
```

```typescript
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.errorMessage = this.route.snapshot.data.message;
    this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data.message;
      }
    );
  }

}
```

```html
<h4>{{errorMessage}}</h4>
```

# Passing Dynamic data to a route.

so instead of using prams subscribe we can use this resolver to pass data to the URL. this method is very effective when it comes to asynchronous data.

```typescript
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CustomerService} from '../customers.service';
import {Injectable} from '@angular/core';

interface Customer {
  id: number;
  name: string;
  phone: string;
}

@Injectable()
export class CustomerResolverService implements Resolve<Customer> {
  constructor(private customerService: CustomerService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Customer> | Promise<Customer> | Customer {
    return this.customerService.getCustomer(+route.params.id);
  }
}
```

```typescript
{path: 'customer/:id', component: CustomerComponent, resolve: {customer: CustomerResolverService}},
// dynamic adding data to the URL so we dont have to get it directly from the URL but from the CUSTOMER object 
```

install the service in app module

```typescript
providers: [CustomerService, CanDeactivateGuardService, CustomerResolverService],
```

# 

