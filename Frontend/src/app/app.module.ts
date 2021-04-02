import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {APP_ROUTING} from './app.routes';



import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { DirectivasComponent } from './directivas/directivas.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PaginatorComponent } from './paginator/paginator.component'

import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';

// ELEGUES
import {LOCALE_ID} from '@angular/core'

//CLiente Service 
import {ClienteService} from './clientes/cliente.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
// import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';


registerLocaleData(localeEs, 'es')




@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    DirectivasComponent,
    FooterComponent,
    HeaderComponent,
    FormComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    BrowserAnimationsModule,
    MaterialModule
    // MatFormFieldModule,
    // MatInputModule,
    // MatButtonModule
    // MaterialModule
  ],
  providers: [ClienteService ,{provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
