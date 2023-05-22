import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPais, Pais } from '../interfaces/pais';

@Injectable({
  providedIn: 'root'
})
export class LocacionService {
  
  constructor(private http: HttpClient) { }

  urlApiLocacion = 'https://countriesnow.space/api/v0.1';

  obtenerPaises():Observable<ApiPais> {
    return this.http.get<ApiPais>(`${this.urlApiLocacion}/countries`);
  }
  
}
