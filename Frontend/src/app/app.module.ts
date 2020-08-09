import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {APP_ROUTING} from './app.routes';

import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { DirectivasComponent } from './directivas/directivas.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';




@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    DirectivasComponent,
    FooterComponent,
    HeaderComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
