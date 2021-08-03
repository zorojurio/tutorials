import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListEmployeesComponent} from './employees/list-employees/list-employees.component';
import {CreateEmployeesComponent} from './employees/create-employees/create-employees.component';
import {DynamicComponent} from './forms/dynamic/dynamic.component';

const routes: Routes = [
  {path: 'list', component: ListEmployeesComponent},
  {path: 'create', component: CreateEmployeesComponent},
  {path: 'form', component: DynamicComponent},
  {path: '', redirectTo: '/list', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // letting know the routes to the angular
  exports: [RouterModule]
})
export class AppRoutingModule { }
