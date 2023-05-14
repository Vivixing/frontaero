import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AdministradorModule } from './administrador/administrador.module';
import { UsuarioModule } from './usuario/usuario.module';


const routes: Routes = [
  {path:'usuario',
  loadChildren:() => import ('./usuario/usuario.module').then(m=> m.UsuarioModule)},
  {path:'administrador', 
  loadChildren: () => import ('./administrador/administrador.module').then(m => m.AdministradorModule)},
  {path:'auth', 
  loadChildren: () => import ('./auth/auth.module').then(m=> m.AuthModule)},

  {path:'**',redirectTo:'usuario'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    UsuarioModule,
    AdministradorModule,
    AuthModule 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
