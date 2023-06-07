import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { IndexPageComponent } from './index-page/index-page.component';
import {PagoUsuarioComponent} from './pago-usuario/pago-usuario.component'
import {FacturaUsuarioComponent} from './factura-usuario/factura-usuario.component';
import { VuelosListadoComponent } from './vuelos-listado/vuelos-listado.component';
import { DatosVueloComponent } from './datos-vuelo/datos-vuelo.component';
import { EscogerVueloComponent } from './escoger-vuelo/escoger-vuelo.component';
import { DatosReservaComponent } from './datos-reserva/datos-reserva.component';
import { VerReservaComponent } from './ver-reserva/ver-reserva.component';
import { GestionarReservaComponent } from './gestionar-reserva/gestionar-reserva.component';
import { AsientosElegirComponent } from './asientos-elegir/asientos-elegir.component'

@NgModule({
  declarations: [
    IndexPageComponent,
    PagoUsuarioComponent,
    FacturaUsuarioComponent,
    VuelosListadoComponent,
    DatosVueloComponent,
    EscogerVueloComponent,
    DatosReservaComponent,
    VerReservaComponent,
    GestionarReservaComponent,
    AsientosElegirComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }
