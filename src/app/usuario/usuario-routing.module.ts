import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './index-page/index-page.component';
import {ReservaUsuarioComponent} from './reserva-usuario/reserva-usuario.component'
import {PagoUsuarioComponent} from './pago-usuario/pago-usuario.component'
import {FacturaUsuarioComponent} from './factura-usuario/factura-usuario.component'


const routes: Routes = [
  {path:'indexUsuario',component:IndexPageComponent},
  {path:'facturaUsuario',component:FacturaUsuarioComponent},
  {path:'reservaUsuario',component:ReservaUsuarioComponent},
  {path:'pagoUsuario',component:PagoUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
