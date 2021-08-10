import {Component, OnInit} from '@angular/core';
import Pusher from 'pusher-js';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  username = 'username';
  messages: Message[] = [];
  message = '';

  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    Pusher.logToConsole = true;

    const pusher = new Pusher('b48adfa7a2630b386866', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', (data: any) => {
      this.messages.push(data);
    });
  }

  submit(): void{
    console.log(this.message);
    let data: Message = {
      message: this.message,
      username: this.username
    }
    this.http.post('http://127.0.0.1:8000/api/messages/', data).subscribe(() => this.message='');
  }
}


interface Message {
  username: string;
  message: string
}
