import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VueloService } from 'src/app/services/vuelo.service';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-vuelo',
  templateUrl: './crear-vuelo.component.html',
  styleUrls: ['./crear-vuelo.component.css']
})
export class CrearVueloComponent implements OnInit {

  aeropuertos: Aeropuerto[] = [];
  vuelo: any;

  constructor(private vueloService: VueloService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    
  }

  vueloFormulario: FormGroup = this.fb.group({

  })

  crearVuelo() {
    // Obtener los aeropuertos seleccionados para origen y destino del vuelo
    const aeropuertoOrigenSeleccionado = this.aeropuertos.find(a => a.aeroId === this.vuelo.aeropuertoOrigen.aeroId);
    const aeropuertoDestinoSeleccionado = this.aeropuertos.find(a => a.aeroId === this.vuelo.aeropuertoDestino.aeroId);

    // Asignar los aeropuertos seleccionados al modelo de vuelo
    this.vuelo.aeropuertoOrigen = aeropuertoOrigenSeleccionado;
    this.vuelo.aeropuertoDestino = aeropuertoDestinoSeleccionado;

    // Enviar la solicitud POST al backend para crear el vuelo
    this.vueloService.crearVuelo(this.vuelo).subscribe(
      (response) => {
        console.log('Vuelo creado exitosamente', response);
        // Restablecer los valores del formulario después de crear el vuelo
        this.vuelo = {
          vueloId: null,
          aeropuertoOrigen: null,
          aeropuertoDestino: null,
          precio: null,
          hora_salida: null,
          hora_llegada: null,
          precioAsientoVip: null,
          precioAsientoNormal: null,
          precioAsientoBasico: null,
          estado: null
        };
      },
      (error) => {
        console.error('Error al crear el vuelo', error);
      }
    );
  }

}
