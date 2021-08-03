import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  lang =new BehaviorSubject<string>(localStorage.getItem('lang') || 'en');
  constructor() {}

  /**
   *setting the selected language in local storage and
   *
   * @param {string} lang
   * @memberof LangService
   */
  changeLang(lang: string){
    this.lang.next(lang);
    localStorage.setItem('lang', lang);
  }

  public get getLang(){
    return this.lang.value;
  }
}
