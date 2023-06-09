import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeInterval, timer } from 'rxjs';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aeropuertos',
  templateUrl: './aeropuertos.component.html',
  styleUrls: ['./aeropuertos.component.css']
})
export class AeropuertosComponent implements OnInit {

  aeropuertos: Aeropuerto[] = [];
  constructor (private aeropuertosService: AeropuertosService,
    private router: Router, private toast:ToastrService){  }

  ngOnInit():void{
    this.aeropuertosService.obtenerAeropuertos().subscribe(
      listadoAeropuerto => this.aeropuertos = listadoAeropuerto
    );
    
  }

  eliminarAeropuerto(aeropuerto: Aeropuerto):void{
    this.aeropuertosService.eliminarAeropuerto(aeropuerto).subscribe((aeropuerto:Aeropuerto)=>{
      this.toast.success('¡Operación exitosa!','Actualizar aeropuerto con éxito')
    }, 
    (err:HttpErrorResponse)=>{
      if(err.status == 400){
        console.log(err.error);
        const mensaje = err.error.mensaje;
        this.toast.error('¡Algo salió mal!',mensaje)
      }
    });
  }
  actualizarAeropuerto(aeropuerto: Aeropuerto):void{
    const aeroId = aeropuerto.aeroId // Valor del aeroId
    this.router.navigate(['/administrador/aeropuertoEditarAdmin/', aeroId]);
  }
}
