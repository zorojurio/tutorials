import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from './service/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngx-local';
  name = 'Chanuka';
  role = 'admin';
  param = { value: 'world' };
  lang: string;
  constructor(
    private translate: TranslateService,
    private langService: LangService
  ) {
    this.translate.setDefaultLang('en');
    this.langService.lang.subscribe(x => {
      this.lang = x;
      this.translate.use(this.lang);
    });

  }

  ngOnInit() {

  }
}
