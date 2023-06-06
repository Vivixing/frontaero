import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Reserva, ReservaModelo } from '../interfaces/reserva';
import { Avion } from '../interfaces/avion';
import { Trayecto } from '../interfaces/trayecto';
import { Aeropuerto } from '../interfaces/aeropuerto';
import { Vuelo } from '../interfaces/vuelo';
import { Asiento } from '../interfaces/asiento';
import { VueloService } from './vuelo.service';
import { AsientoService } from './asiento.service';
import { TrayectoService } from './trayecto.service';
import { AeropuertosService } from './aeropuertos.service';
import { AvionService } from './avion.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private reservaModeloUsuario = new Subject<ReservaModelo>();
  constructor(private http:HttpClient,private vueloService:VueloService,private asientoService:AsientoService,
    private trayectoService:TrayectoService,private aeropuertoService:AeropuertosService,private avionService:AvionService) { }

  urlReserva = `${environment.serverUrl}reserva`

  //Obtener todas las reservas
  obtenerReservas():Observable<Reserva[]>{
    return this.http.get<Reserva[]>(`${this.urlReserva}/obtenerReserva`)
  }
  //Obtener reservas por Id
  obtenerReservaById(id:number):Observable<Reserva>{
    return this.http.get<Reserva>(`${this.urlReserva}/${id}`)
  }
  //Crear Reserva
  crearReserva(reserva:Reserva):Observable<Reserva>{
    return this.http.post<Reserva>(`${this.urlReserva}/guardarReserva`, reserva)
  }
  //Actualizar Reserva
  actualizarReserva(reserva:Reserva):Observable<Reserva>{
    return this.http.put<Reserva>(`${this.urlReserva}/modificarReserva`,reserva)
  }

  //Eliminar Reserva
  eliminarReserva(idReserva:number):Observable<Reserva>{
    return this.http.delete<Reserva>(`${this.urlReserva}/eliminarReserva${idReserva}`)
  }

  //Obtener Resersvas por usuario 
  ontenerReservaDelUsuario(cedula:string):Observable<Reserva[]>{
    return this.http.get<Reserva[]>(`${this.urlReserva}/obtenerReservasUsuario/${cedula}`)
  }

  //Reserva Modelo
  mandarReservaUsarioModelo(reservaModelo:ReservaModelo){
    this.reservaModeloUsuario.next(reservaModelo)
  }

  obtenerReservaUsuarioModelo():Observable<ReservaModelo>{
    return this.reservaModeloUsuario.asObservable()
  }

  //Datos reserva

  obtenerDatosReserva(reseId:number){
    let avionesDatos : Avion[]=[]
    let escalasDatos : Trayecto[]=[]
    let aeropuertosDatos : Aeropuerto[]=[]
    let reservaDatos: Reserva
    let vueloDatos : Vuelo
    let asientoDatos : Asiento
    let reservaModelo !: ReservaModelo

    this.obtenerReservaById(reseId).subscribe(reserva=>{
      reservaDatos=reserva

      this.vueloService.obtenerVueloById(reserva.vuelId).subscribe(vuelo=>{
        vueloDatos=vuelo

        this.asientoService.obtenerAsientoById(reserva.asieId).subscribe(asiento=>{
          asientoDatos= asiento

          this.trayectoService.obtenerTrayectoByVuelo(vuelo.vueloId).subscribe(trayectos=>{
            escalasDatos.push(trayectos)

            for(let i=0; i<escalasDatos.length; i++){
              this.aeropuertoService.obtenerAeropuertoById(escalasDatos[i].aereoIdOrigen).subscribe(origen=>{
                aeropuertosDatos.push(origen)

                this.aeropuertoService.obtenerAeropuertoById(escalasDatos[i].aereoIdDestino).subscribe(destino=>{
                  aeropuertosDatos.push(destino)

                  this.avionService.obtenerAvionById(escalasDatos[i].avioId).subscribe(avion=>{
                    avionesDatos.push(avion)

                    if(i==(escalasDatos.length-1)){
                      reservaModelo = {}
                    }
                  })
                })
              })
            }
          })
        })
      })
    })
  }
}
