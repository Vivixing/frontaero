import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path:'usuario', loadChildren: ()=> import('./usuario/usuario.module').then(m => m.UsuarioModule)},
  {path:'auth', loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)},
  {path:'administrador',loadChildren:() => import('./administrador/administrador.module').then(m=>m.AdministradorModule)},
  {path:'**',redirectTo:'usuario'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
