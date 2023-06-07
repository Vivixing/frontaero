import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaModelo } from 'src/app/interfaces/reserva';
import { ReservaService } from 'src/app/services/reserva.service';


@Component({
  selector: 'app-datos-reserva',
  templateUrl: './datos-reserva.component.html',
  styleUrls: ['./datos-reserva.component.css']
})
export class DatosReservaComponent implements OnInit {

  datosReserva !: ReservaModelo
  listadoAeropuertos: any = []

  constructor(private reservaService: ReservaService, private router: Router) {

  }

  ngOnInit(): void {
    const idReserva = parseInt(this.router.url.split("/").pop() || "0");
   // this.reservaService.obtenerDatosReserva(idReserva);
    this.reservaService.obtenerReservaUsuarioModelo().subscribe(response => {
      this.datosReserva = response
    })
  }

  pagarReserva() {
    this.datosReserva.reservaDatos.estado = 'Activo'
    this.datosReserva.reservaDatos.estadoPago = 'Activo'
    console.log(this.datosReserva)
    this.reservaService.actualizarReserva(this.datosReserva.reservaDatos).subscribe(reserva => {
      this.datosReserva.reservaDatos = reserva
      console.log(reserva)
      this.router.navigate([])
    })
  }

  cancelarReserva() {
    this.datosReserva.reservaDatos.estado = 'Inactivo'
    this.datosReserva.reservaDatos.estadoPago = 'Inactivo'
    console.log(this.datosReserva)
    this.reservaService.actualizarReserva(this.datosReserva.reservaDatos).subscribe(reserva => {
      this.datosReserva.reservaDatos = reserva
      console.log(this.datosReserva.reservaDatos)
      this.router.navigate([])
    })
  }
  organizacionAeropuertos() {
    const escalas = this.datosReserva.escalasDatos

    escalas.sort((a, b) => {
      const fechaHoraLlegada1 = new Date(a.horaLlegada).getTime();
      const fechaHoraLlegada2 = new Date(b.horaLlegada).getTime();

      if (fechaHoraLlegada1 < fechaHoraLlegada2) {
        return -1;
      } else if (fechaHoraLlegada1 < fechaHoraLlegada2) {
        return 1;
      } else {
        return 0
      }
    });

    for (let i = 0; i < escalas.length; i++) {
      let aeropuertos = []
      for(let j=0; j<this.datosReserva.aeropuertosDatos.length; j++){
        if(escalas[i].aereoIdOrigen == this.datosReserva.aeropuertosDatos[j].aeroId)aeropuertos[0]=(this.datosReserva.aeropuertosDatos[j])
        if(escalas[i].aereoIdDestino == this.datosReserva.aeropuertosDatos[j].aeroId)aeropuertos[1]=(this.datosReserva.aeropuertosDatos[j])
      }
      this.listadoAeropuertos.push(aeropuertos)
    }
  }
}
