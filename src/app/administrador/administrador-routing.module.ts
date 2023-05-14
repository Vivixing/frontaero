import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AvionesComponent } from './aviones/aviones.component';
import { VuelosComponent } from './vuelos/vuelos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AeropuertosComponent } from './aeropuertos/aeropuertos.component';
import { CrearAeropuertoComponent } from './crear-aeropuerto/crear-aeropuerto.component';
import { CrearAvionComponent } from './crear-avion/crear-avion.component';
import { CrearVueloComponent } from './crear-vuelo/crear-vuelo.component';


const routes: Routes = [
  {path:'dashboardAdmin',component:DashboardComponent},
  {path:'avionesListadoAdmin',component:AvionesComponent},
  {path:'avionCrearAdmin',component:CrearAvionComponent},
  {path:'vuelosListadoAdmin',component:VuelosComponent},
  {path:'vueloCrearAdmin',component:CrearVueloComponent},
  {path:'aeropuertosListadoAdmin',component:AeropuertosComponent},
  {path:'aeropuertoCrearAdmin',component:CrearAeropuertoComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
