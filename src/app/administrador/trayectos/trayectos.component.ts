import { Component,OnInit } from '@angular/core';
import { Trayecto } from 'src/app/interfaces/trayecto';
import { TrayectoService } from 'src/app/services/trayecto.service';

@Component({
  selector: 'app-trayectos',
  templateUrl: './trayectos.component.html',
  styleUrls: ['./trayectos.component.css']
})
export class TrayectosComponent implements OnInit{
  
  trayectos:Trayecto[]=[];
  constructor(private trayectoService:TrayectoService){}

  ngOnInit(): void {
    this.trayectoService.obtenerTrayectos().subscribe(
      listadoTrayectos => this.trayectos = listadoTrayectos
    );
  }

}
