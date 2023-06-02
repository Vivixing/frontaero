import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { VuelosComponent } from './vuelos/vuelos.component';
import { AvionesComponent } from './aviones/aviones.component';
import { AeropuertosComponent } from './aeropuertos/aeropuertos.component';
import { CrearAeropuertoComponent } from './crear-aeropuerto/crear-aeropuerto.component';
import { CrearVueloComponent } from './crear-vuelo/crear-vuelo.component';
import { CrearAvionComponent } from './crear-avion/crear-avion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderadminComponent } from './components/headeradmin/headeradmin.component';
import { EditarAeropuertoComponent } from './editar-aeropuerto/editar-aeropuerto.component';
import { EditarAvionComponent } from './editar-avion/editar-avion.component';



@NgModule({
  declarations: [
    VuelosComponent,
    AvionesComponent,
    AeropuertosComponent,
    CrearAeropuertoComponent,
    CrearVueloComponent,
    CrearAvionComponent,
    DashboardComponent,
    HeaderadminComponent,
    EditarAeropuertoComponent,
    EditarAvionComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdministradorModule { }
