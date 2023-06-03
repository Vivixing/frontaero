import { Component, OnInit } from '@angular/core';
import {Asiento} from 'src/app/interfaces/asiento';
import {AsientoService} from 'src/app/services/asiento.service';

@Component({
  selector: 'app-asientos',
  templateUrl: './asientos.component.html',
  styleUrls: ['./asientos.component.css']
})
export class AsientosComponent implements OnInit{
  asientos : Asiento[] = [];

  constructor(private asientosService : AsientoService){}
  
  ngOnInit(): void {
    this.asientosService.obtenerAsientos().subscribe(
      e => this.asientos = e
    );
  }

}
