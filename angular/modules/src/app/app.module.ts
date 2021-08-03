import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { EmployeeModule } from './employees/employee.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
