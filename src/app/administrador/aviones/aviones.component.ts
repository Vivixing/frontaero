import { Component, OnInit } from '@angular/core';
import { Avion } from 'src/app/interfaces/avion';
import { AvionService } from 'src/app/services/avion.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-aviones',
  templateUrl: './aviones.component.html',
  styleUrls: ['./aviones.component.css']
})
export class AvionesComponent implements OnInit {

  aviones : Avion[] = [];

  constructor(private avionService : AvionService,private router:Router, private toast: ToastrService){}
  
  ngOnInit(): void {
    this.avionService.obtenerAviones().subscribe(
      e => this.aviones = e
    );
    
  }

  eliminarAvion(avion:Avion):void{
    this.avionService.eliminarAvion(avion).subscribe((avion:Avion)=>{
      this.toast.success('¡Operación exitosa!','Avión eliminado con éxito')
    },
    (err:HttpErrorResponse)=>{
      if(err.status == 400){
        console.log(err.error);
        const mensaje = err.error.mensaje;
        this.toast.error('¡Algo salió mal!',mensaje)
      }
    })
  }

  actualizarAvion(avion:Avion): void{
    const avioId = avion.avioID // Valor del avioID
    this.router.navigate(['/administrador/avionEditarAdmin/', avioId]);
  }
}
