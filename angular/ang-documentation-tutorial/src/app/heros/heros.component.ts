import {Component, OnInit} from '@angular/core';
import {HEROES} from './mock-heroes';
import {Hero} from './hero';
import {HeroService} from '../services/hero.service';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {

  heroes: Hero[] | undefined;
  selectedHero: Hero | undefined;
  checkAuth = (user: any) => {
    setTimeout(() => {
      user({isAuth: true});
    }, 2000);
  }
  constructor(private heroService: HeroService) {

  }

  ngOnInit(): void {
    this.getHeros();
    this.checkAuth((user: any) => {
      console.log(user.isAuth);
    })
    
  }
  getHeros(): void{
    this.heroService.getHeroes().subscribe((heroes) =>{ 
      this.heroes = heroes
    });
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }


}
