import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component'
import { DirectivasComponent } from './directivas/directivas.component'
import { FormComponent } from './clientes/form.component';
import { DetalleComponent } from './clientes/detalle/detalle.component'


const APP_ROUTES: Routes =[
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivasComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:false});
