import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Vuelo, VueloModelo } from '../interfaces/vuelo';
import { AeropuertosService } from './aeropuertos.service';

@Injectable({
  providedIn: 'root'
})
export class VueloService {

  constructor(private http:HttpClient,private aeropuertoService:AeropuertosService) { }

  urlVuelo = `${environment.serverUrl}vuelo`

  //Obtener todos los vuelos
  obtenerVuelos():Observable<Vuelo[]>{
    return this.http.get<Vuelo[]>(`${this.urlVuelo}/obtenerVuelos`)
  }

  //Obtener vuelo por id
  obtenerVueloById(id:number):Observable<Vuelo>{
    return this.http.get<Vuelo>(`${this.urlVuelo}/${id}`)
  }

  //Crear vuelo
  crearVuelo(vuelo:Vuelo):Observable<Vuelo>{
    return this.http.post<Vuelo>(`${this.urlVuelo}/guardarVuelo`,vuelo)
  }

  //Actualizar Vuelo
  actualizarVuelo(vuelo:Vuelo):Observable<Vuelo>{
    return this.http.put<Vuelo>(`${this.urlVuelo}/modificarVuelo`,vuelo)
  }

  //Eliminar Vuelo
  eliminarVuelo(vuelo:Vuelo):Observable<Vuelo>{
    return this.http.put<Vuelo>(`${this.urlVuelo}/eliminarVuelo/${vuelo.vueloId}`,vuelo)
  }

  //Obtener Vuelos Activos
  obtenerVuelosActivos():Observable<Vuelo[]>{
    return this.http.get<Vuelo[]>(`${this.urlVuelo}/vuelosActivos`)
  }
  
  obtenerVueloConLosDatos():Promise<any[]>{
    let vuelosModelo: any[]=[]
    return new Promise<any[]>((resolve,reject) => {
      try{
        this.obtenerVuelosActivos()?.subscribe((response:Vuelo[])=>{
          vuelosModelo = response.map(vueloAntiguo =>{
            let nuevoVuelo: VueloModelo={
              aeropuerto_aeroIdOrigen: {nombre:'',iata:'',estado:'',ubicacion:''},
              aeropuerto_aeroIdDestino: {nombre:'',iata:'',estado:'',ubicacion:''},
              nombreAeroOrigen: '',
              nombreAeroDestino: '',
              precio: 0,
              hora_salida: new Date(),
              hora_llegada: new Date(),
              precioAsientoVip: 0,
              precioAsientoNormal: 0,
              precioAsientoBasico: 0,
              estado: ''
            };
            if(vueloAntiguo.estado=='Activo'){
              nuevoVuelo.vueloId = vueloAntiguo.vueloId
              nuevoVuelo.hora_salida = vueloAntiguo.hora_salida
              nuevoVuelo.hora_llegada = vueloAntiguo.hora_llegada
              nuevoVuelo.precioAsientoBasico = vueloAntiguo.precioAsientoBasico
              nuevoVuelo.precioAsientoNormal = vueloAntiguo.precioAsientoNormal
              nuevoVuelo.precioAsientoVip = vueloAntiguo.precioAsientoVip
              nuevoVuelo.estado = 'Activo'
              nuevoVuelo.precio = vueloAntiguo.precio
              this.aeropuertoService.obtenerAeropuertoById(vueloAntiguo.aeropuerto_aeroIdOrigen).subscribe(response =>{
                nuevoVuelo.aeropuerto_aeroIdOrigen = response
                this.aeropuertoService.obtenerAeropuertoById(vueloAntiguo.aeropuerto_aeroIdDestino).subscribe(response=>{
                  nuevoVuelo.aeropuerto_aeroIdDestino = response
                })
              })
            }
            return nuevoVuelo
          })
          resolve(vuelosModelo)
        })
      }catch(error){
        console.log('Error obteniendo el modelo del vuelo'+ error)
        reject([])
      }
    })
  }
}
