import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VueloService } from 'src/app/services/vuelo.service';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-vuelo',
  templateUrl: './crear-vuelo.component.html',
  styleUrls: ['./crear-vuelo.component.css']
})
export class CrearVueloComponent implements OnInit {

  aeropuertos: Aeropuerto[] = [];
  vuelos: Vuelo[] = [];


  constructor(private vueloService: VueloService,
    private fb: FormBuilder, private aeropuertoService: AeropuertosService) { }


  ngOnInit(): void {
    this.getAeropuertos()
    this.getAviones()
  }
  fechas = {

    fechaEscala1   : "",
    fechaEscala1_2 : "",

    fechaEscala2  : "",
    fechaEscala2_2 : "",

    fechaEscala3   : "",
    fechaEscala3_2  : "",
  }

  vueloFormulario: FormGroup = this.fb.group({
    precioVuelo: [, [Validators.required]],
    precioAsientoVip: [],
    precioAsientoNormal: [],
    precioAsientoBasico: [],
    aeroOrigen_1: [],
    aeroOrigen_2: [],
    aeroOrigen_3: [],
    aeroDestino_1: [],
    aeroDestino_2: [],
    aeroDestino_3: [],
    fechaOrigen_1: [],
    fechaOrigen_2: [],
    fechaOrigen_3: [],
    fechaDestino_1: [],
    fechaDestino_2: [],
    fechaDestino_3: [],
    idAvion1:[],
    idAvion2:[],
    idAvion3:[]
  })
  validacionEscalasFechas(){
    const formularioFechas = this.vueloFormulario.controls
    this.fechas.fechaEscala1_2=this.vueloFormulario.controls['fechaOrigen_1'].value
    this.fechas.fechaEscala2=this.vueloFormulario.controls['fechaDestino_1'].value
    this.fechas.fechaEscala2_2=this.vueloFormulario.controls['fechaOrigen_2'].value
    this.fechas.fechaEscala3=this.vueloFormulario.controls['fechaDestino_2'].value
    this.fechas.fechaEscala3_2=this.vueloFormulario.controls['fechaOrigen_3'].value

    // Desactivar formularios que aún no se pueden tocar    

    if( formularioFechas['fechaOrigen_1'].value == null){
      this.vueloFormulario.get("fechaDestino_1")?.disable()
    }else {this.vueloFormulario.get("fechaDestino_1")?.enable()}


    // Desactivar fecha segunda escala
    if( formularioFechas['fechaDestino_1'].value == null ) this.vueloFormulario.get("fechaOrigen_2")?.disable()
    else this.vueloFormulario.get("fechaOrigen_2")?.enable()
    

    if( formularioFechas['fechaOrigen_2'].value == null ) this.vueloFormulario.get("fechaDestino_2")?.disable()
    else this.vueloFormulario.get("fechaDestino_2")?.enable()
  

    // Desactivar fecha tercer escala
    if( formularioFechas['fechaDestino_2'].value == null  ) this.vueloFormulario.get("fechaOrigen_3")?.disable()
    else this.vueloFormulario.get("fechaOrigen_3")?.enable()
    

    if( formularioFechas['fechaOrigen_3'].value == null  ) this.vueloFormulario.get("fechaDestino_3")?.disable()
    else this.vueloFormulario.get("fechaDestino_3")?.enable()
  }
  getAeropuertos() {
    this.aeropuertoService.obtenerAeropuertos().subscribe(listaAeropuertos => {
      this.aeropuertos = listaAeropuertos
    })
  }
  getAviones() {
    this.vueloService.obtenerVuelos().subscribe(listaVuelos => {
      this.vuelos = listaVuelos
    })
  }
  crearVuelo() {
    this.vueloFormulario.valid
    // Obtener los aeropuertos seleccionados para origen y destino del vuelo
    const aeropuertoOrigenSeleccionado = this.aeropuertos.find(a => a.aeroId === this.vuelos.find(e => e.aeropuerto_aeroIdOrigen));
    const aeropuertoDestinoSeleccionado = this.aeropuertos.find(a => a.aeroId === this.vuelos.find(e => e.aeropuerto_aeroIdDestino));

    // Asignar los aeropuertos seleccionados al modelo de vuelo
    this.vuelos.find(e=> e.aeropuerto_aeroIdOrigen) == aeropuertoOrigenSeleccionado;
    this.vuelos.find(e=> e.aeropuerto_aeroIdDestino) == aeropuertoDestinoSeleccionado;

    //Enviar el form
    const VueloCrear: Vuelo = {
      aeropuerto_aeroIdOrigen: parseInt(this.vueloFormulario.controls['aeroOrigen_1'].value),
      aeropuerto_aeroIdDestino: parseInt(this.vueloFormulario.controls['aeroDestino_1'].value),
      nombreAeroOrigen: this.vueloFormulario.controls['aeroOrigen_1'].value,
      nombreAeroDestino: this.vueloFormulario.controls['aeroDestino_1'].value,
      precio: this.vueloFormulario.controls['precioVuelo'].value,
      hora_salida: this.vueloFormulario.controls['fechaOrigen_1'].value,
      hora_llegada: this.vueloFormulario.controls['fechaDestino_1'].value,
      precioAsientoVip: parseInt(this.vueloFormulario.controls['precioAsientoVip'].value),
      precioAsientoNormal: parseInt(this.vueloFormulario.controls['precioAsientoNormal'].value),
      precioAsientoBasico: parseInt(this.vueloFormulario.controls['precioAsientoBasico'].value),
      estado: 'Activo'
    }
    this.vueloService.crearVuelo(VueloCrear)?.subscribe(
      vuelo => {
        if (vuelo == null) {
          console.log('No se puede crear el vuelo')
          return
        /*}if (vuelo.vueloId == undefined) {
          console.log('El id del vuelo es indefinido')
          return*/
        }else {
          console.log('Vuelo creado con éxito')
          this.vueloFormulario.reset()
        }
      },
      errorVuelo => {
        let errorMensaje = 'Error al crear el vuelo';

        if (errorVuelo.error && errorVuelo.error.mensaje) {
          errorMensaje = errorVuelo.error.mensaje;
        }
        console.log(errorMensaje, 'Error');
      }
    )

  }

}
