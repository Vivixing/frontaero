import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Reserva } from '../interfaces/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http:HttpClient) { }

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
}
