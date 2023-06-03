import { Component, OnInit } from '@angular/core';
import { Avion } from 'src/app/interfaces/avion';
import { AvionService } from 'src/app/services/avion.service';



@Component({
  selector: 'app-aviones',
  templateUrl: './aviones.component.html',
  styleUrls: ['./aviones.component.css']
})
export class AvionesComponent implements OnInit {

  aviones : Avion[] = [];

  constructor(private avionService : AvionService){}
  
  ngOnInit(): void {
    this.avionService.obtenerAviones().subscribe(
      e => this.aviones = e
    );
  }

}
