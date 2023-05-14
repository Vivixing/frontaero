import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { Error404Component } from './error404/error404.component';


const routes: Routes = [
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:IndexComponent},
  {path:'error',component:Error404Component},
  {path:'**',redirectTo:'error'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
