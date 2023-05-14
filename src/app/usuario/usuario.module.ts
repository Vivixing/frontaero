import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';

import { IndexComponent } from './index/index.component';
import { Error404Component } from './error404/error404.component';


@NgModule({
  declarations: [
    IndexComponent,
    Error404Component
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ],
  exports:[
    IndexComponent,
    Error404Component
  ]
})
export class UsuarioModule { }
