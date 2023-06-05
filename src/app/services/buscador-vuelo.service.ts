import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { VueloModelo } from '../interfaces/vuelo';

@Injectable({
  providedIn: 'root'
})
export class BuscadorVueloService {

  constructor() { }

  //Instancia de la clase Subject 
  private vuelosBuscados = new Subject<VueloModelo[]>()
  //Subject es un tipo de observable en RxJS que actúa como 
  //un emisor de eventos y permite enviar y recibir valores a través de sus métodos next() y subscribe() 
  //solo aceptará y emitirá arreglos de objetos de tipo VueloCompleto.

  //Este método asignarVuelosBuscados() se utiliza para establecer el valor de vuelosBuscados. Recibe un arreglo de objetos de tipo VueloModelo como parámetro y utiliza el método next() del Subject para enviar esos vuelos al Subject. Básicamente, se emite un nuevo valor a través del Subject para que los suscriptores puedan recibirlo.
  asignarVuelosBuscados(vuelos: VueloModelo[]) {
    this.vuelosBuscados.next(vuelos)
  }

  //Este método obtenerVuelosBuscados() se utiliza para obtener un observable del Subject vuelosBuscados. Retorna el Subject convertido en un observable utilizando el método asObservable(). Al hacer esto, se garantiza que los suscriptores solo puedan recibir los valores emitidos por el Subject y no puedan modificarlo directamente.
  obtenerVuelosBuscados(): Observable<VueloModelo[]> {
    return this.vuelosBuscados.asObservable()
  }

  //En resumen, el código proporciona una forma de enviar y recibir arreglos de objetos VueloModelo
  //entre diferentes partes de la aplicación. El método asignarVuelosBuscados() se utiliza para enviar nuevos vuelos al Subject
  //y el método obtenerVuelosBuscados() se utiliza para obtener un observable que permite a los componentes suscribirse y recibir los vuelos emitidos por el Subject.
}
