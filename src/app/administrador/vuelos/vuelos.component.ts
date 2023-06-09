import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { VueloService } from 'src/app/services/vuelo.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.css']
})
export class VuelosComponent implements OnInit {

  vuelos: Vuelo[]=[];

  constructor(private vueloService: VueloService, private router: Router, private toastr:ToastrService){}

  ngOnInit(): void {
   this.vueloService.obtenerVuelos().subscribe(
    e => this.vuelos = e
   );
  }

  eliminarVuelo(vuelo:Vuelo){
    this.vueloService.eliminarVuelo(vuelo).subscribe((vuelo:Vuelo)=>{
      this.toastr.success('Vuelo eliminado exitosamente')
      console.log('Avion Eliminado',vuelo);
    },
    error=>{
      this.toastr.error('Error al eliminar el vuelo')
      console.error('Error al eliminar el vuelo',error);
    })
  }
  actualizarVuelo(vuelo:Vuelo){
    const vueloId = vuelo.vueloId// Valor del aeroId
    this.router.navigate(['/administrador/vueloEditarAdmin/', vueloId]);
  }
}
