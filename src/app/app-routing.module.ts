import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { Error404Component } from './components/error404/error404.component';


const routes: Routes = [
  {path:'',component:IndexComponent},
  {path:'index',component:IndexComponent},
  {path:'usuario', loadChildren: ()=> import('./usuario/usuario.module').then(m => m.UsuarioModule)},
  {path:'auth', loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)},
  {path:'administrador',loadChildren:() => import('./administrador/administrador.module').then(m=>m.AdministradorModule)},
  {path:'**',component:Error404Component}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
