import { Injectable } from '@angular/core';
import { Hero } from '../heros/hero';
import { HEROES } from '../heros/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';



@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private mesaageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    // sending the message after fetching the data
    this.mesaageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
}
