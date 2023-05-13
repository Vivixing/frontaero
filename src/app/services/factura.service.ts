import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Factura } from '../interfaces/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http:HttpClient) { }

  urlFactura = `${environment.serverUrl}factura`

  //Obtener todas las facturas
  obtenerFacturas():Observable<Factura[]>{
    return this.http.get<Factura[]>(`${this.urlFactura}obtenerFactura`)
  }

  //Obtener factura por Id
  obtenerFacturaById(id:number):Observable<Factura>{
    return this.http.get<Factura>(`${this.urlFactura}/${id}`)
  }

  //Crear Factura
  crearFactura(factura:Factura):Observable<Factura>{
    return this.http.post<Factura>(`${this.urlFactura}/guardarFactura`,factura)
  }
}
