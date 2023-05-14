import { Component, OnInit} from '@angular/core';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { VueloService } from 'src/app/services/vuelo.service';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css']
})
export class VuelosComponent implements OnInit {

  vuelos: Vuelo[]=[];

  constructor(private vueloService: VueloService){}

  ngOnInit(): void {
   this.vueloService.obtenerVuelos().subscribe(
    e => this.vuelos = e
   );
  }

}
