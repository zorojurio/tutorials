import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employees/list-employees/list-employees.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateEmployeesComponent} from './employees/create-employees/create-employees.component';
import { DynamicComponent } from './forms/dynamic/dynamic.component';


@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeesComponent,
    NavbarComponent,
    DynamicComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
