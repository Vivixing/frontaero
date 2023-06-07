import { Component, OnInit } from '@angular/core';
import { Avion } from 'src/app/interfaces/avion';
import { AvionService } from 'src/app/services/avion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-aviones',
  templateUrl: './aviones.component.html',
  styleUrls: ['./aviones.component.css']
})
export class AvionesComponent implements OnInit {

  aviones : Avion[] = [];

  constructor(private avionService : AvionService,private router:Router){}
  
  ngOnInit(): void {
    this.avionService.obtenerAviones().subscribe(
      e => this.aviones = e
    );
    
  }

  eliminarAvion(avion:Avion):void{
    this.avionService.eliminarAvion(avion).subscribe((avion:Avion)=>{
      console.log('Avion Eliminado',avion);
    },
    error=>{
      console.error('Error al eliminar el aeropuerto',error);
    })
  }

  actualizarAvion(avion:Avion): void{
    const avioId = avion.avioID // Valor del avioID
    this.router.navigate(['/administrador/avionEditarAdmin/', avioId]);
  }
}
