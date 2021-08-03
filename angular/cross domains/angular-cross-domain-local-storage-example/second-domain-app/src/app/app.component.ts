import { Component } from '@angular/core';

declare let CrossStorageHub: any;
declare let CrossStorageClient: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  localStorageItem: string;
  crossDomainItem: string;
  storage: any;

  constructor() {

  }

  getFromLocalStorage() {
    this.crossDomainItem = this.storage.onConnect().then(() => {
      console.log(this.storage.get('cross-domain-item'));
      return this.storage.get('cross-domain-item');
    });
  }


}
