import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { IndexPageComponent } from './index-page/index-page.component';
import {ReservaUsuarioComponent} from './reserva-usuario/reserva-usuario.component'
import {PagoUsuarioComponent} from './pago-usuario/pago-usuario.component'
import {FacturaUsuarioComponent} from './factura-usuario/factura-usuario.component'

@NgModule({
  declarations: [
    IndexPageComponent,
    ReservaUsuarioComponent,
    PagoUsuarioComponent,
    FacturaUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
