import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { CustomPreloadingService } from './services/custom-preloading.service';

const employeeModule = () => import('./employees/employee.module').then(m => m.EmployeeModule);

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'employee', data: { preload: true }, loadChildren: employeeModule },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: CustomPreloadingService}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
