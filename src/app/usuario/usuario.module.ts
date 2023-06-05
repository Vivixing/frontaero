import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { IndexPageComponent } from './index-page/index-page.component';
import {ReservaUsuarioComponent} from './reserva-usuario/reserva-usuario.component'
import {PagoUsuarioComponent} from './pago-usuario/pago-usuario.component'
import {FacturaUsuarioComponent} from './factura-usuario/factura-usuario.component';
import { VuelosListadoComponent } from './vuelos-listado/vuelos-listado.component';
import { DatosVueloComponent } from './datos-vuelo/datos-vuelo.component';
import { EscogerVueloComponent } from './escoger-vuelo/escoger-vuelo.component'

@NgModule({
  declarations: [
    IndexPageComponent,
    ReservaUsuarioComponent,
    PagoUsuarioComponent,
    FacturaUsuarioComponent,
    VuelosListadoComponent,
    DatosVueloComponent,
    EscogerVueloComponent
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
