import { Component,OnInit } from '@angular/core';
import { VueloModelo } from 'src/app/interfaces/vuelo';
import { VueloService } from 'src/app/services/vuelo.service';

@Component({
  selector: 'app-escoger-vuelo',
  templateUrl: './escoger-vuelo.component.html',
  styleUrls: ['./escoger-vuelo.component.css']
})
export class EscogerVueloComponent implements OnInit{
  vuelos: VueloModelo[] = []
  constructor(private vueloService:VueloService){

  }
  ngOnInit(): void {
    this.obtenerVuelos().then(response => {
      this.vuelos = response
    })
  }

  obtenerVuelos():Promise<any[]>{
    return this.vueloService.obtenerVueloConLosDatos()
  }
}
