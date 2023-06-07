import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trayecto } from 'src/app/interfaces/trayecto';
import { TrayectoService } from 'src/app/services/trayecto.service';

@Component({
  selector: 'app-trayectos',
  templateUrl: './trayectos.component.html',
  styleUrls: ['./trayectos.component.css']
})
export class TrayectosComponent implements OnInit{
  
  trayectos:Trayecto[]=[];
  constructor(private trayectoService:TrayectoService,
              private router: Router){}

  ngOnInit(): void {
    this.trayectoService.obtenerTrayectos().subscribe(
      listadoTrayectos => this.trayectos = listadoTrayectos
    );
  }

  eliminarTrayecto(trayecto:Trayecto):void{
    this.trayectoService.eliminarTrayecto(trayecto).subscribe((trayecto:Trayecto)=>{
      console.log('Trayecto Eliminado',trayecto);
    },
    error=>{
      console.error('Error al eliminar el trayecto',error);
    })
  }
  actualizarTrayecto(trayecto:Trayecto){
    const trayectoId = trayecto.trayId // Valor del aeroId
    this.router.navigate(['/administrador/trayectoEditarAdmin/', trayectoId]);
  }
}
