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
import { TrayectosComponent } from './trayectos/trayectos.component';
import { CrearTrayectoComponent } from './crear-trayecto/crear-trayecto.component';
import { EditarVueloComponent } from './editar-vuelo/editar-vuelo.component';
import { EditarTrayectoComponent } from './editar-trayecto/editar-trayecto.component';
import { AsientosComponent } from './asientos/asientos.component';



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
    EditarAvionComponent,
    TrayectosComponent,
    CrearTrayectoComponent,
    EditarVueloComponent,
    EditarTrayectoComponent,
    AsientosComponent
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
