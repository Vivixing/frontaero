import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { VuelosComponent } from './vuelos/vuelos.component';
import { AvionesComponent } from './aviones/aviones.component';
import { AeropuertosComponent } from './aeropuertos/aeropuertos.component';
import { CrearAeropuertoComponent } from './crear-aeropuerto/crear-aeropuerto.component';
import { CrearVueloComponent } from './crear-vuelo/crear-vuelo.component';
import { CrearAvionComponent } from './crear-avion/crear-avion.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    VuelosComponent,
    AvionesComponent,
    AeropuertosComponent,
    CrearAeropuertoComponent,
    CrearVueloComponent,
    CrearAvionComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule
  ],
  exports:[
    VuelosComponent,
    AvionesComponent,
    AeropuertosComponent,
    CrearAeropuertoComponent,
    CrearVueloComponent,
    CrearAvionComponent,
    DashboardComponent,
  ]
})
export class AdministradorModule { }
