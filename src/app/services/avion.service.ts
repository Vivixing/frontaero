import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Avion } from '../interfaces/avion';

@Injectable({
  providedIn: 'root'
})
export class AvionService {

  constructor(private http:HttpClient) { }

  urlAvion = `${environment.serverUrl}avion`

  //Obtener todos los Aviones
  obtenerAviones():Observable<Avion[]>{
    return this.http.get<Avion[]>(`${this.urlAvion}/obtenerAviones`)
  }

  //Obtener Avión por Id
  obtenerAvionById(id:number):Observable<Avion>{
    return this.http.get<Avion>(`${this.urlAvion}/${id}`)
  }

  //Crear Avión
  crearAvion(avion:Avion):Observable<Avion>{
    return this.http.post<Avion>(`${this.urlAvion}/guardarAviones`,avion)
  }

  //Actualizar Avion
  actualizarAvion(avion:Avion):Observable<Avion>{
    return this.http.put<Avion>(`${this.urlAvion}/modificarAvion`,avion)
  }

  //Eliminar Avion
  eliminarAvion(idAvion:number):Observable<Avion>{
    return this.http.delete<Avion>(`${this.urlAvion}/eliminarAvion${idAvion}`)
  }
}
