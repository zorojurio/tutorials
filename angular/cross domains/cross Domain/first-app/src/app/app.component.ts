import {Component, OnInit} from '@angular/core';

declare let CrossStorageHub: any;
declare let CrossStorageClient: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  localStorageItem: any;
  crossDomainItem: any;
  storage: any;

  constructor() {
    CrossStorageHub.init([
      {origin: /example.com:4200$/, allow: ['get', 'set', 'del', 'getKeys', 'clear']},
      {origin: /dashboard.example.com:3000$/, allow: ['get', 'set', 'del', 'getKeys', 'clear']},
    ]);
  }

  getFromLocalStorage() {
    this.localStorageItem = localStorage.getItem('item');
    this.crossDomainItem = this.storage.onConnect().then(() => {
      console.log(this.storage.get('cross-domain-item'));
      return this.storage.get('cross-domain-item');
    });
  }

  addToLocalStorage() {
    this.storage = new CrossStorageClient('http://dashboard.example.com:3000/hub.html', {timeout: 5000});
    this.storage.onConnect().then(() => {
      return this.storage.set('cross-domain-item', 'First application cross domain item');
    });
    localStorage.setItem('item', 'First application item');
  }
}
