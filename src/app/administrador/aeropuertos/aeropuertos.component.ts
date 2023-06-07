import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeInterval, timer } from 'rxjs';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';

@Component({
  selector: 'app-aeropuertos',
  templateUrl: './aeropuertos.component.html',
  styleUrls: ['./aeropuertos.component.css']
})
export class AeropuertosComponent implements OnInit {

  aeropuertos: Aeropuerto[] = [];
  constructor (private aeropuertosService: AeropuertosService,
    private router: Router){  }

  ngOnInit():void{
    this.aeropuertosService.obtenerAeropuertos().subscribe(
      listadoAeropuerto => this.aeropuertos = listadoAeropuerto
    );
    
  }

  eliminarAeropuerto(aeropuerto: Aeropuerto):void{
    this.aeropuertosService.eliminarAeropuerto(aeropuerto).subscribe((aeropuerto:Aeropuerto)=>{
      console.log('Aeropuerto Eliminado',aeropuerto);
    }, 
    (error)=>{
      console.error('Error al eliminar el aeropuerto',error);
    })
  }
  actualizarAeropuerto(aeropuerto: Aeropuerto):void{
    const aeroId = aeropuerto.aeroId // Valor del aeroId
    this.router.navigate(['/administrador/aeropuertoEditarAdmin/', aeroId]);
  }
}
