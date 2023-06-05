import { Component,OnInit,Input} from '@angular/core';
import { VueloModelo } from 'src/app/interfaces/vuelo';
import { BuscadorVueloService } from 'src/app/services/buscador-vuelo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vuelos-listado',
  templateUrl: './vuelos-listado.component.html',
  styleUrls: ['./vuelos-listado.component.css']
})
export class VuelosListadoComponent implements OnInit{
  @Input() listadoVuelos !: VueloModelo[];
  exiteBuscador: boolean = false
  buscadorVuelos !: Observable<VueloModelo[]>;

  constructor(private buscadorVuelosService:BuscadorVueloService){}

  ngOnInit(): void {
    if(this.listadoVuelos !== undefined){
      this.exiteBuscador=true
    }
    this.buscadorVuelos = this.buscadorVuelosService.obtenerVuelosBuscados()
    this.buscadorVuelos.subscribe(vuelos =>{
      this.listadoVuelos = vuelos

      if(vuelos.length>0){
        this.exiteBuscador=true
      }else{
        this.exiteBuscador=false
      }
    })
  }

}
