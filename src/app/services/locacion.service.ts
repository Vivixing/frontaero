import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/pais';

@Injectable({
  providedIn: 'root'
})
export class LocacionService {
  
  constructor(private http: HttpClient) { }

  urlApiLocacion = 'https://restcountries.com/v2/all';

  obtenerPaises():Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.urlApiLocacion}`);
  }

  /*obtenerCiudades(pais: string): Observable<any> {
    return this.http.get<any>(`${this.urlApiLocacion}//name/${pais}?fullText=true`);
  }*/

  
}
