import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  urlUsuario = `${environment.serverUrl}usuario`

  //Obtener todos los Usuarios
  obtenerUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.urlUsuario}/obtenerUsuarios`)
  }
  //Obtener todos Usuarios por Id
  obtenerUsuarioById(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlUsuario}/${id}`)
  }
  //Crear Usuario
  crearUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.urlUsuario}/guardarUsuario`,usuario)
  }
}
