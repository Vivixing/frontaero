import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Trayecto } from '../interfaces/trayecto';

@Injectable({
  providedIn: 'root'
})
export class TrayectoService {

  constructor(private http:HttpClient) { }

  urlTrayecto = `${environment.serverUrl}trayecto`

  //Obtener todos los trayectos
  getAll():Observable<Trayecto[]>{
    return this.http.get<Trayecto[]>(`${this.urlTrayecto}/obtenerTrayecto`)
  }

  //Obtener trayecto por Id
  getById(id:number):Observable<Trayecto>{
    return this.http.get<Trayecto>(`${this.urlTrayecto}/${id}`)
  }

  //Crear Trayecto
  create(trayecto:Trayecto):Observable<Trayecto>{
    return this.http.post<Trayecto>(`${this.urlTrayecto}/guardarTrayecto`,trayecto)
  }
}
