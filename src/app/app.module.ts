import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VuelosComponent } from './vuelos/vuelos.component';
import { AvionesComponent } from './aviones/aviones.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { IndexComponent } from './index/index.component';
import { ErrorComponent } from './error/error.component';
import { AeropuertosComponent } from './aeropuertos/aeropuertos.component';
import { CrearAeropuertoComponent } from './crear-aeropuerto/crear-aeropuerto.component';
import { CrearVueloComponent } from './crear-vuelo/crear-vuelo.component';
import { CrearAvionComponent } from './crear-avion/crear-avion.component';

@NgModule({
  declarations: [
    AppComponent,
    VuelosComponent,
    AvionesComponent,
    LoginComponent,
    RegistroComponent,
    IndexComponent,
    ErrorComponent,
    AeropuertosComponent,
    CrearAeropuertoComponent,
    CrearVueloComponent,
    CrearAvionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
