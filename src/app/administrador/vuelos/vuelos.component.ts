import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { VueloService } from 'src/app/services/vuelo.service';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css']
})
export class VuelosComponent implements OnInit {

  vuelos: Vuelo[]=[];

  constructor(private vueloService: VueloService, private router: Router){}

  ngOnInit(): void {
   this.vueloService.obtenerVuelos().subscribe(
    e => this.vuelos = e
   );
  }

  eliminarVuelo(vuelo:Vuelo){
    this.vueloService.eliminarVuelo(vuelo).subscribe((vuelo:Vuelo)=>{
      console.log('Avion Eliminado',vuelo);
    },
    error=>{
      console.error('Error al eliminar el vuelo',error);
    })
  }
  actualizarVuelo(vuelo:Vuelo){
    const vueloId = vuelo.vueloId// Valor del aeroId
    this.router.navigate(['/administrador/vueloEditarAdmin/', vueloId]);
  }
}
