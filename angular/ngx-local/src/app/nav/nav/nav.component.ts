import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LangService } from '../../service/lang.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  lang;
  constructor(private langService: LangService) {
    this.langService.lang.subscribe(x => {
      console.log(x);
      this.lang = x;
    });
    console.log(this.lang);

   }

  ngOnInit(): void {

  }
  /**
   *get the language value from the selected language
   *
   * @param {string} lang
   * @memberof NavComponent
   */
  changeLang(lang: string){
    this.langService.changeLang(lang);
  }

}
