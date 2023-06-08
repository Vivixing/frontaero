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
  constructor(private http: HttpClient, private vueloService: VueloService, private asientoService: AsientoService,
    private trayectoService: TrayectoService, private aeropuertoService: AeropuertosService, private avionService: AvionService) { }

  urlReserva = `${environment.serverUrl}reserva`

  //Obtener todas las reservas
  obtenerReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.urlReserva}/obtenerReserva`)
  }
  //Obtener reservas por Id
  obtenerReservaById(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.urlReserva}/${id}`)
  }

  //Obtener Reservas Activas
  obtenerReservasActivas():Observable<Reserva[]>{
    return this.http.get<Reserva[]>(`${this.urlReserva}/reservasUsuario`)
  }

  //Crear Reserva
  crearReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.urlReserva}/guardarReserva`, reserva)
  }
  //Actualizar Reserva
  actualizarReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.urlReserva}/modificarReserva`, reserva)
  }

  //Eliminar Reserva
  eliminarReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.urlReserva}/eliminarReserva/${reserva.reseId}`,reserva)
  }

  //Obtener Resersvas por usuario 
  obtenerReservaDelUsuario(id: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.urlReserva}/obtenerReservasUsuario/${id}`)
  }

  //Reserva Modelo
  mandarReservaUsarioModelo(reservaModelo: ReservaModelo) {
    this.reservaModeloUsuario.next(reservaModelo)
  }

  obtenerReservaUsuarioModelo(): Observable<ReservaModelo> {
    return this.reservaModeloUsuario.asObservable()
  }

  //Datos reserva

  // obtenerDatosReserva(reseId: number) {
  //   let avionesDatos: Avion[] = [];
  //   let escalasDatos: Trayecto[] = [];
  //   let aeropuertosDatos: Aeropuerto[] = [];
  //   let reservaDatos: Reserva;
  //   let vueloDatos: Vuelo;
  //   let asientoDatos: Asiento;
  //   let reservaModelo!: ReservaModelo;

  //   this.obtenerReservaById(reseId).subscribe(reserva => {
  //     reservaDatos = reserva;

  //     if (reserva.vuelId !== undefined) {
  //       this.vueloService.obtenerVueloById(reserva.vuelId).subscribe(vuelo => {
  //         vueloDatos = vuelo;

  //         if (reserva.asieId !== undefined) {
  //           this.asientoService.obtenerAsientoById(reserva.asieId).subscribe(asiento => {
  //             asientoDatos = asiento;

  //             if (vuelo.vueloId !== undefined) {
  //               this.trayectoService.obtenerTrayectoByVuelo(vuelo.vueloId).subscribe(trayecto => {
  //                 escalasDatos.push(trayecto);

  //                 if (trayecto.aereoIdOrigen !== undefined) {
  //                   this.aeropuertoService.obtenerAeropuertoById(trayecto.aereoIdOrigen).subscribe(origen => {
  //                     aeropuertosDatos.push(origen);

  //                     if (trayecto.aereoIdDestino !== undefined) {
  //                       this.aeropuertoService.obtenerAeropuertoById(trayecto.aereoIdDestino).subscribe(destino => {
  //                         aeropuertosDatos.push(destino);

  //                         if (trayecto.avioId !== undefined) {
  //                           this.avionService.obtenerAvionById(trayecto.avioId).subscribe(avion => {
  //                             avionesDatos.push(avion);

  //                             reservaModelo = {
  //                               reservaDatos,
  //                               vueloDatos,
  //                               escalasDatos,
  //                               avionesDatos,
  //                               aeropuertosDatos,
  //                               asientoDatos
  //                             };
  //                             this.mandarReservaUsarioModelo(reservaModelo)
  //                           });
  //                         }
  //                       });
  //                     }
  //                   });
  //                 }
  //               });
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });
  // }

}
