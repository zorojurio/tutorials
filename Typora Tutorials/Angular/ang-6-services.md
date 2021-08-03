# Services

![image-20201119085101900](https://i.loli.net/2020/11/19/mV192b54wW8EZMf.png)

in the above code, log data method in both About component and UserDetailComponent are pretty much same. basically we are duplicating the code.  and user Component will save data, in these cases we use services. services acts as a central repository, where u can store data and centralized code. 

# Creating a service

```typescript
// loggin.services.ts
export class LoggingService{
  logStatusChange(status: string){
    console.log('A server status changed, new status '+ status)
  }
}

// instanriation the  service, this is not the recomended way
import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from '../logging.service'

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountAdded.emit({
      name: accountName,
      status: accountStatus
    });
    const logginService = new LoggingService();
    logginService.logStatusChange(accountStatus);
  }
}
```

## 

# Dependency Injector

dependency is a class of ours will depend on. new account component will depend on the logging service because we want to call a method in that service. dependency class inject an instance of the class automatically. to use we need to inform angular that we are using a dependency. 



in the constructor of the class where we want to inject the service, we need to pass the service class in to the constructor. so this informs angular that we need an instance of the class we provided in the constructor as parameters. when we pass something in to the constructor as parameters angular  knows that we require those arguments later.  Angular only knows until up to now, and we need to tell angular how to create the property. there we use provides in the component decorator. 

```typescript
import {Component, EventEmitter, Output} from '@angular/core';
import {LoggingService} from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService] // telling angular to how to create an instance of the class
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{ name: string, status: string }>();

  constructor(private loggingService: LoggingService) {
      // now angular know that we need an instance of this class
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountAdded.emit({
      name: accountName,
      status: accountStatus
    });
    this.loggingService.logStatusChange(accountStatus);
  }
}
```

# Data service

to store and manage data we use data services. app module has the highest hierarchical order 

![image-20201119202306054](https://i.loli.net/2020/11/19/JkSFlAxXD1eavjs.png)

# injecting services into services

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import {AccountService} from './account.service';
import {LoggingService} from './logging.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NewAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [AccountService, LoggingService], // so any where in the app we can use services
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```typescript
import {Component, OnInit} from '@angular/core';
import {AccountService} from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit{
  accounts: {name: string, status: string}[] = [];
  constructor(private accountService: AccountService) {

  }
  ngOnInit(): void {
    this.accounts = this.accountService.accounts; // getting the data from cental service
  }

}
```

```typescript
import { Component, Input } from '@angular/core';
import {AccountService} from '../account.service';
import {LoggingService} from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],

})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;


  constructor(private loggingService: LoggingService,
              private accountService: AccountService) {
    // now angular know that we need an instance of this class
  }

  onSetTo(status: string) {
    this.accountService.updateStatus(this.id, status);
  }
}
```

```typescript
import {Component, EventEmitter, Output} from '@angular/core';
import {LoggingService} from '../logging.service';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],

})
export class NewAccountComponent {
  constructor(private loggingService: LoggingService,
              private accountService: AccountService) {
    // now angular know that we need an instance of this class
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);
  }
}
```

```typescript
import {Injectable} from '@angular/core';
import {LoggingService} from './logging.service';

@Injectable()
export class AccountService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  constructor(private loggingService: LoggingService) { // logging service to be injected
  }

  addAccount(name: string, status: string) {
    this.accounts.push({name: name, status: status});
    this.loggingService.logStatusChange(status); // injecting th logging service
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}
```

#  Using Services for Cross-Component Communication

```typescript
import {EventEmitter, Injectable} from '@angular/core';
import {LoggingService} from './logging.service';

@Injectable()
export class AccountService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];
  ststusUpdated = new EventEmitter<string>();
  constructor(private loggingService: LoggingService) {
  }

  addAccount(name: string, status: string) {
    this.accounts.push({name: name, status: status});
    this.loggingService.logStatusChange(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}
```

```typescript
import {Component, Input} from '@angular/core';
import {AccountService} from '../account.service';
import {LoggingService} from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],

})
export class AccountComponent {
  @Input() account: { name: string, status: string };
  @Input() id: number;


  constructor(private loggingService: LoggingService,
              private accountService: AccountService) {
    // now angular know that we need an instance of this class

  }

  onSetTo(status: string) {
    this.accountService.updateStatus(this.id, status);
    this.accountService.ststusUpdated.emit(status); // emitting the account data
    // event emitter lives in services
  }
}
```

```typescript
import {Component} from '@angular/core';
import {LoggingService} from '../logging.service';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],

})
export class NewAccountComponent {
  constructor(private loggingService: LoggingService,
              private accountService: AccountService) {
    // now angular know that we need an instance of this class
      
      // when instantiating this subscribe to the status update and listening to the event emitter
    this.accountService.ststusUpdated.subscribe(
      (status: string) => alert('New Status ' + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);
  }
}
```