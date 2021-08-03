# Observables

Observable is a data source, which is implemented in a way that it follows the observable pattern. u can program the observable to emit data. trigger data

![image-20201128110646759](https://i.loli.net/2020/11/28/6kCLub7KTsGPrzS.png)

the other part is the observer,  which handles following 3 parts. this is similar to the subscribe function. 

![image-20201128111056767](https://i.loli.net/2020/11/28/89sKR1jom3EC4LT.png)

Observables are constructs, to which u subscribe be informed about the changes in data because, observables are stream of data, whenever new data piece is emitted our subscription will know about it. 

```typescript
ngOnInit() {
  this.route.params.subscribe((params: Params) => { // params is the observable
      // it is a stream of route parameters
    this.id = +params.id;
  });
}
```

params is the observable t is a stream of route parameters that gives us new values, and that stream gives us a new route parameter, when ever we go to a new page, then we pass the function subscribe, we get the new params and we can extract our relevant params, in this case the ID PARAM from that. 

# Understanding Observables

```typescript
import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';

ngOnInit() {
  // here we are creating a new observable which fires a number every second
  this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(count); // number starting from zero will be incremented and printed to the console
      // after exactly one second
    }
  );
}

ngOnDestroy(): void {
  this.firstObsSubscription.unsubscribe(); // unscubscribing the observeble
// here when u navigate to another URL u will unsubscribe the observeble
}
```

# Build Own Observable

```typescript
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private customSubscriber: Subscription;

  constructor() {
  }

  ngOnInit() {
    // creating new observable
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count); // calling next to emit a new value
        count++;
      }, 1000);
    });

    // subscribing the custom observable
    this.customSubscriber = customIntervalObservable.subscribe(data => {
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.customSubscriber.unsubscribe();
  }

}
```

# Errors 

Emitting new data is the most important thing observables do.  when subscribing first argument is the data that u are getting other than HTTP requests and error handling. 

```typescript
ngOnInit() {
    // creating new observable
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        if (count > 3) {
          observer.error(new Error('Count is greater than 3')); // when throws an error it dies
        }
        observer.next(count);
        count++;
      }, 1000);
    });

    // subscribing the custom observable
    this.customSubscriber = customIntervalObservable.subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error); // u can store it in back end and database
      alert(error.message);
    });
  }

  ngOnDestroy(): void {
    this.customSubscriber.unsubscribe();
  }
```

# Completion

here u will get no error because it will complete it before it reaches the line error

```typescript
ngOnInit() {
    // creating new observable
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        if (count === 2){
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3')); // when throws an error it dies
        }
        observer.next(count);
        count++;
      }, 1000);
    });

    // subscribing the custom observable
    this.customSubscriber = customIntervalObservable.subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error); // u can store it in back end and database
      alert(error.message);
    }, () => { // takes no arguments this fires when u complete the observable 
        // when u encountered an error this will not be fired because error cancels the observable
      console.log('Observable is now completed');
    });
  }

  ngOnDestroy(): void {
    this.customSubscriber.unsubscribe();
  }
```

# Understanding Operators

we use operators to change the data, filter the data before it arrives the subscription as data, so subscription will get changed data. 

![image-20201129095705251](https://i.loli.net/2020/11/29/ZPNqt7D8dfgCw1n.png)

```typescript
import {map} from 'rxjs/operators';

private customSubscriber: Subscription;

  constructor() {
  }

  ngOnInit() {
    // creating new observable
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3')); // when throws an error it dies
        }
        observer.next(count);
        count++;
      }, 1000);
    });
    // operators


    // subscribing the custom observable
    this.customSubscriber = customIntervalObservable.pipe(filter(data => {
      return data > 0;
    }) ,map(data => { // getting the current data emitted by observable
      return 'Round ' + (+data + 1); // here now it will be starting from round two
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error); // u can store it in back end and database
      alert(error.message);
    }, () => {
      console.log('Observable is now completed');
    });
  }

  ngOnDestroy(): void {
    this.customSubscriber.unsubscribe();
  }
```

![image-20201129103012329](https://i.loli.net/2020/11/29/HTD1zW3ASZEXcbK.png)

# Event Emitter and services

```typescript
import {EventEmitter, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'}) // short and easier way to add the service to the app modules
export class UserService{
  activatedEmitter = new EventEmitter<boolean>();
}
```

```html
<button class="btn btn-primary" (click)="onActivate()">Activate</button>
```

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }

  onActivate(){
    this.userService.activatedEmitter.emit(true);
  }
}
```

```typescript
import { Component, OnInit } from '@angular/core';
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userActivated = false;
  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.activatedEmitter.subscribe(didActivate => {
      this.userActivated = didActivate;
    });
  }
}
```

```html
<div class="container">
  <div class="row">
    <div class="col-12">
      <p *ngIf="userActivated">Activated</p>
    </div>
  </div>
</div>
```

once the user click the Activate button, it will render the Activate paragraph. but there is a better way using SUBJECTS

## Difference between subjects and observable

![image-20201129115906384](https://i.loli.net/2020/11/29/B2ngredalYS8Kbi.png)

