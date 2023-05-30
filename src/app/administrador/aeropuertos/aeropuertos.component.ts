import { Component, OnInit } from '@angular/core';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';

@Component({
  selector: 'app-aeropuertos',
  templateUrl: './aeropuertos.component.html',
  styleUrls: ['./aeropuertos.component.css']
})
export class AeropuertosComponent implements OnInit {

  aeropuertos: Aeropuerto[] = [];
  constructor (private aeropuertosService: AeropuertosService){  }

  ngOnInit():void{
    this.aeropuertosService.obtenerAeropuertos().subscribe(
      listadoAeropuerto => this.aeropuertos = listadoAeropuerto
    );
  }
}
