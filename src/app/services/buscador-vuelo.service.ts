import { Injectable } from '@angular/core';
import { Subject,Observable } from 'rxjs';
import { VueloModelo } from '../interfaces/vuelo';

@Injectable({
  providedIn: 'root'
})
export class BuscadorVueloService {

  constructor() { }

  private vuelosBuscados = new Subject<VueloModelo[]>()

  
  asignarVuelosBuscados(vuelos: VueloModelo[]){
    this.vuelosBuscados.next(vuelos)
  }

  obtenerVuelosBuscados():Observable<VueloModelo[]>{
    return this.vuelosBuscados.asObservable()
  }
}
