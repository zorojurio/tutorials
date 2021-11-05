import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BackendComponent } from './modules/components/backend/backend.component';
import { FrontendComponent } from './modules/components/frontend/frontend.component';

const routes: Routes = [
  {path: 'frontend', component: FrontendComponent},
  {path: 'backend', component: BackendComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
