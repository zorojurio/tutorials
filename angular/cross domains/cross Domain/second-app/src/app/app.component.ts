import {Component} from '@angular/core';

declare let CrossStorageHub: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  storage: any;

  constructor() {
    CrossStorageHub.init([
      {origin: /dashboard.example.com:3000$/, allow: ['get', 'set', 'del', 'getKeys', 'clear']},
      {origin: /example.com:4200$/, allow: ['get', 'set', 'del', 'getKeys', 'clear']},
    ]);

  }

  getLocal(): void {
    if (localStorage.getItem('cross-domain-item')){
      console.log(localStorage.getItem('cross-domain-item'));
    }else {
      console.log('still local is not intialized');
    }
  }

}
