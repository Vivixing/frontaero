import { Component, Input, OnInit } from '@angular/core';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { Trayecto, TrayectoModelo } from 'src/app/interfaces/trayecto';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { Avion } from 'src/app/interfaces/avion';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { AvionService } from 'src/app/services/avion.service';
import { TrayectoService } from 'src/app/services/trayecto.service';
@Component({
  selector: 'app-datos-vuelo',
  templateUrl: './datos-vuelo.component.html',
  styleUrls: ['./datos-vuelo.component.css']
})
export class DatosVueloComponent implements OnInit {
  @Input() vuelo !: Vuelo
  @Input() trayectos !: Trayecto[]
  trayectoModelo !: TrayectoModelo[]
  aeropuertos !: Aeropuerto
  aeropuertosBase: Aeropuerto[] = []

  constructor(private trayectoService: TrayectoService, private aeropuertoService: AeropuertosService, private avionService: AvionService) { }

  ngOnInit(): void {
    this.obtenerAeropuertosBase()
  }

  obtenerTrayectosDelVuelo() {
    this.trayectoModelo = []
    // Obtener los trayectos
    this.obtenerTrayectos().subscribe(trayectos => {
      // Iterar sobre los trayectos obtenidos
      for (let i = 0; i < trayectos.length; i++) {
        const { trayId, horaSalida, horaLlegada, vuelId, estado } = trayectos[i];
        let avioId: Avion;
        let aereoIdOrigen: Aeropuerto;
        let aereoIdDestino: Aeropuerto;

        this.avionService.obtenerAvionById(trayectos[i].avioId).subscribe(response => {
          avioId = response;

          this.aeropuertoService.obtenerAeropuertoById(trayectos[i].aereoIdOrigen).subscribe(response => {
            aereoIdOrigen = response;

            this.aeropuertoService.obtenerAeropuertoById(trayectos[i].aereoIdDestino).subscribe(response => {
              aereoIdDestino = response;

              const agregarTrayecto = { trayId, avioId, aereoIdOrigen, aereoIdDestino, horaSalida, horaLlegada, vuelId, estado };
              this.trayectoModelo.push(agregarTrayecto);
            });
          });
        });
      }
    });
  }

  obtenerAeropuertosBase(){
    const cantidadTrayectos = this.trayectos.length

    this.aeropuertoService.obtenerAeropuertoById(this.trayectos[0].aereoIdOrigen).subscribe(response=>{
      this.aeropuertosBase.push(response)
      
      this.aeropuertoService.obtenerAeropuertoById(this.trayectos[cantidadTrayectos-1].aereoIdDestino).subscribe(response=>{
        this.aeropuertosBase.push(response)

        console.log(this.aeropuertosBase)
        this.obtenerTrayectosDelVuelo()
      })
    })
  }
  obtenerTrayectos() {
    return this.trayectoService.obtenerTrayectos()
  }

}
