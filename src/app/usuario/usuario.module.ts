import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { IndexPageComponent } from './index-page/index-page.component';
import { FacturaUsuarioComponent } from './factura-usuario/factura-usuario.component';
import { PagoUsuarioComponent } from './pago-usuario/pago-usuario.component';
import { ReservaUsuarioComponent } from './reserva-usuario/reserva-usuario.component';


@NgModule({
  declarations: [
    IndexPageComponent,
    FacturaUsuarioComponent,
    PagoUsuarioComponent,
    ReservaUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
