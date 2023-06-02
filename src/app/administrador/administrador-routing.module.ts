import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AvionesComponent } from './aviones/aviones.component';
import { VuelosComponent } from './vuelos/vuelos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AeropuertosComponent } from './aeropuertos/aeropuertos.component';
import { CrearAeropuertoComponent } from './crear-aeropuerto/crear-aeropuerto.component';
import { CrearAvionComponent } from './crear-avion/crear-avion.component';
import { CrearVueloComponent } from './crear-vuelo/crear-vuelo.component';
import { EditarAeropuertoComponent } from './editar-aeropuerto/editar-aeropuerto.component';
import { EditarAvionComponent } from './editar-avion/editar-avion.component';
import { TrayectosComponent } from './trayectos/trayectos.component';
import { CrearTrayectoComponent } from './crear-trayecto/crear-trayecto.component';

const routes: Routes = [
  {path:'dashboardAdmin',component:DashboardComponent},
  {path:'avionesListadoAdmin',component:AvionesComponent},
  {path:'avionCrearAdmin',component:CrearAvionComponent},
  {path:'avionEditarAdmin',component:EditarAvionComponent},
  {path:'vuelosListadoAdmin',component:VuelosComponent},
  {path:'vueloCrearAdmin',component:CrearVueloComponent},
  {path:'aeropuertosListadoAdmin',component:AeropuertosComponent},
  {path:'aeropuertoCrearAdmin',component:CrearAeropuertoComponent},
  {path:'aeropuertoEditarAdmin',component:EditarAeropuertoComponent},
  {path:'trayectosListadoAdmin',component:TrayectosComponent},
  {path:'trayectoCrearAdmin',component:CrearTrayectoComponent}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
