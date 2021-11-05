import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BackendComponent } from './modules/components/backend/backend.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { FrontendComponent } from './modules/components/frontend/frontend.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { ProductComponent } from './modules/components/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    BackendComponent,
    FrontendComponent,
    NavbarComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
