import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionarReservaComponent } from './gestionar-reserva/gestionar-reserva.component'; 
import {PagoUsuarioComponent} from './pago-usuario/pago-usuario.component'
import {FacturaUsuarioComponent} from './factura-usuario/factura-usuario.component'
import { EscogerVueloComponent } from './escoger-vuelo/escoger-vuelo.component';
import { AsientosElegirComponent } from './asientos-elegir/asientos-elegir.component';
const routes: Routes = [
  
  {path:'facturaUsuario/:id/:vuelo',component:FacturaUsuarioComponent},
  {path:'reservaUsuario/:id/:vuelo',component:GestionarReservaComponent},
  {path:'pagoUsuario',component:PagoUsuarioComponent},
  {path:'escogerVuelo',component:EscogerVueloComponent},
  {path:'asientosElegir/:id/:vuelo/:usuario',component:AsientosElegirComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
