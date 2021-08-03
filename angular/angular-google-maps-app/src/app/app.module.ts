import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBKiaXhaMhQnbyOB3rxlcSs4-NB9hK8Jlo',
      libraries: ["places", "geometry"]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
