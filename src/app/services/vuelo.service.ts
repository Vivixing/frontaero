import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Vuelo } from '../interfaces/vuelo';

@Injectable({
  providedIn: 'root'
})
export class VueloService {

  constructor(private http:HttpClient) { }

  urlVuelo = `${environment.serverUrl}vuelo`

  //Obtener todos los vuelos
  getAll():Observable<Vuelo[]>{
    return this.http.get<Vuelo[]>(`${this.urlVuelo}/obtenerVuelos`)
  }

  //Obtener vuelo por id
  getById(id:number):Observable<Vuelo>{
    return this.http.get<Vuelo>(`${this.urlVuelo}/${id}`)
  }

  //Crear vuelo
  create(vuelo:Vuelo):Observable<Vuelo>{
    return this.http.post<Vuelo>(`${this.urlVuelo}/guardarVuelo`,vuelo)
  }

}