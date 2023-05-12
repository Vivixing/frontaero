import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Aeropuerto } from '../interfaces/aeropuerto';

@Injectable({
  providedIn: 'root'
})
export class AeropuertosService {

  constructor(private http:HttpClient) { }

  urlAeropuerto = `${environment.serverUrl}aeropuerto`

  //Obtener todos los Aeropuertos
  obtenerAeropuertos():Observable<Aeropuerto[]>{ 
    //Observable es asíncrono, permite obtener datos a menera que estén disponibles
    return this.http.get<Aeropuerto[]>(`${this.urlAeropuerto}/obtenerAeropuertos`)
  }

  //Obtener Aeropuerto por Id
  obtenerAeropuertoById(id:number):Observable<Aeropuerto>{
    return this.http.get<Aeropuerto>(`${this.urlAeropuerto}/${id}`)
  }

  //Crear Aeropuerto
  crearAeropuerto(aeropuerto:Aeropuerto):Observable<Aeropuerto>{
    return this.http.post<Aeropuerto>(`${this.urlAeropuerto}/guardarAeropuerto`,aeropuerto)
  }

}
