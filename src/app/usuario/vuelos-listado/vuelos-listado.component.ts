import { Component,OnInit,Input} from '@angular/core';
import { VueloModelo } from 'src/app/interfaces/vuelo';
import { BuscadorVueloService } from 'src/app/services/buscador-vuelo.service';
import { Observable, first } from 'rxjs';
import { TrayectoService } from 'src/app/services/trayecto.service';
import { Trayecto } from 'src/app/interfaces/trayecto';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-vuelos-listado',
  templateUrl: './vuelos-listado.component.html',
  styleUrls: ['./vuelos-listado.component.css']
})
export class VuelosListadoComponent implements OnInit{
  @Input() listadoVuelos !: VueloModelo[];
  exiteBuscador: boolean = false
  buscadorVuelos !: Observable<VueloModelo[]>;
  trayectos !: Trayecto[];

  constructor(private buscadorVuelosService:BuscadorVueloService, private trayectoService:TrayectoService, private router:Router, private authService:AuthService){}

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
  //Cuando se hace click en el boton de reservar se llama a este metodo
  reservarVuelo(vuelo: VueloModelo) {
    if (this.authService.getIsLoggedIn()) {
      if(vuelo.vueloId){
        this.trayectoService.obtenerTrayectoByVuelo(vuelo.vueloId).subscribe(
          listadoTrayecto => this.trayectos = listadoTrayecto)
          console.log(this.trayectos[0].avioId)
          const avionId = this.trayectos[0].avioId
          const vueloId = vuelo.vueloId
          const usuarioId = this.authService.getUserId()
          //Redireccionar a la página de elegir asientos
          this.router.navigate(['/usuario/asientosElegir', avionId, vueloId, usuarioId])
          }
    } else {
      this.router.navigate(['/auth/login'])
    }
    
    }

  }

