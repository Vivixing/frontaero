import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AvionesComponent } from './aviones/aviones.component';
import { ErrorComponent } from './error/error.component';
import { VuelosComponent } from './vuelos/vuelos.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AeropuertosComponent } from './aeropuertos/aeropuertos.component';
import { CrearAeropuertoComponent } from './crear-aeropuerto/crear-aeropuerto.component';
import { CrearAvionComponent } from './crear-avion/crear-avion.component';
import { CrearVueloComponent } from './crear-vuelo/crear-vuelo.component';

const routes: Routes = [
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:IndexComponent},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'avionesListadoAdmin',component:AvionesComponent},
  {path:'avionCrearAdmin',component:CrearAvionComponent},
  {path:'vuelosListadoAdmin',component:VuelosComponent},
  {path:'vueloCrearAdmin',component:CrearVueloComponent},
  {path:'aeropuertosListadoAdmin',component:AeropuertosComponent},
  {path:'aeropuertoCrearAdmin',component:CrearAeropuertoComponent},
  {path: '**', component:ErrorComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
