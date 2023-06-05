import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReservaUsuarioComponent} from './reserva-usuario/reserva-usuario.component'
import {PagoUsuarioComponent} from './pago-usuario/pago-usuario.component'
import {FacturaUsuarioComponent} from './factura-usuario/factura-usuario.component'
import { EscogerVueloComponent } from './escoger-vuelo/escoger-vuelo.component';

const routes: Routes = [
  
  {path:'facturaUsuario',component:FacturaUsuarioComponent},
  {path:'reservaUsuario',component:ReservaUsuarioComponent},
  {path:'pagoUsuario',component:PagoUsuarioComponent},
  {path:'escogerVuelo',component:EscogerVueloComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
