import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Asiento } from '../interfaces/asiento';

@Injectable({
  providedIn: 'root'
})
export class AsientoService {

  constructor(private http: HttpClient) { }

  urlAsiento = `${environment.serverUrl}asiento`

  //Obtener todos los Asientos
  obtenerAsientos():Observable<Asiento[]>{
    return this.http.get<Asiento[]>(`${this.urlAsiento}/obtenerAsientos`)
  }

  //Obtener Asiento por Id
  obtenerAsientoById(id:number):Observable<Asiento>{
    return this.http.get<Asiento>(`${this.urlAsiento}/${id}`)
  }

  //Crear Asiento
  crearAsiento(asiento:Asiento){
    return this.http.post<Asiento>(`${this.urlAsiento}/guardarAsiento`,asiento)
  }

  //Actualizar Asiento
  actualizarAsiento(asiento:Asiento):Observable<Asiento>{
    return this.http.put<Asiento>(`${this.urlAsiento}/modificarAsiento`,asiento)
  }

  //Eliminar Asiento
  eliminarAsiento(idAsiento:number):Observable<Asiento>{
    return this.http.delete<Asiento>(`${this.urlAsiento}/eliminarAsiento${idAsiento}`)
  }
}
