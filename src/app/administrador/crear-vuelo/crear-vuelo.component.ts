import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VueloService } from 'src/app/services/vuelo.service';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { Avion } from 'src/app/interfaces/avion';
import { AvionService } from 'src/app/services/avion.service';

@Component({
  selector: 'app-crear-vuelo',
  templateUrl: './crear-vuelo.component.html',
  styleUrls: ['./crear-vuelo.component.css']
})
export class CrearVueloComponent implements OnInit {

  aeropuertos: Aeropuerto[] = [];
  vuelos: Vuelo[] = [];
  vueloForm: FormGroup


  constructor(private vueloService: VueloService, private AvionService: AvionService,
    private fb: FormBuilder, private aeropuertoService: AeropuertosService) {
    this.vueloForm = this.fb.group({
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      tieneEscalas:[false],
      precioVuelo:[Validators.required],
      fechaHoraSalida: ['', [Validators.required]],
      fechaHoraLlegada: ['', [Validators.required]],
      precioAsientoVip:[],
      precioAsientoNormal:[],
      precioAsientoBasico:[],
      escalas:this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.getAeropuertos()
  }

  get escalas(){
    return this.vueloForm.get('escalas') as FormArray;
  }

  agregarEscalas(){
    const escalasGroup = this.fb.group({
      aeropuertoEscala:[],
      fechaHoraSalida:[],
      fechaHoraLlegada:[]
    });
    this.escalas.push(escalasGroup);
  }
  eliminarEscala(index:number){
    this.escalas.removeAt(index);
  }

  enviarFromulario() {
    if (this.vueloForm.valid) {
      const datosVuelo = this.vueloForm.value;
      // Realiza la validación de id de aeropuerto de origen y destino
      if (datosVuelo.origen === datosVuelo.destino) {
        alert('El aeropuerto de origen y destino deben ser diferentes.');
        return;
      }
      //Validacioón fecha salida con la de llegada
      const fechaHoraSalida = this.vueloForm.get('fechaHoraSalida')?.value;
      const fechaHoraLlegada = this.vueloForm.get('fechaHoraLlegada')?.value;
      if (fechaHoraSalida >= fechaHoraLlegada) {
        alert('La fecha hora de salida no puede ser igual o una fecha después que la fecha hora de llegada')
        return;
      }
      //Validación escalas
      if(datosVuelo.tieneEscalas && datosVuelo.escalas.length < 1){
        alert('Debe agregar al menos una escala')
        return;
      }
      //Validación Aeropuertos de escalas diferentes a los de origen y destino
      for(const escalas of datosVuelo.escalas){
        if(escalas.aeroId === datosVuelo.origen || escalas.aeroId === datosVuelo.destino){
          alert('Los aeropuertos de escalas deben ser diferentes a el aeropuerto de origen y destino')
          return;
        }
        const escalaFechaHoraSalida = this.escalas.get('fechaHoraSalida')?.value;
        const escalaFechaHoraLlegada = this.escalas.get('fechaHoraLlegada')?.value;
        if(escalaFechaHoraSalida >= escalaFechaHoraLlegada){
          alert('La fecha hora de salida de la escala no puede ser después de la fecha hora de llegada')
          return;
        }
      }

      this.vueloService.crearVuelo(datosVuelo).subscribe((response)=>{
        console.log('Datos enviados éxitosamente al backend')
        this.vueloForm.reset(); 
      },
      (error)=>{
        console.error('Error al enviar los datos al backend',error);
      });
    }
    
  }

  

  /*
  fechas = {

    fechaEscala1   : "",
    fechaEscala1_2 : "",

    fechaEscala2  : "",
    fechaEscala2_2 : "",

    fechaEscala3   : "",
    fechaEscala3_2  : "",
  }*/

  /*vueloFormulario: FormGroup = this.fb.group({
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
  }*/
  getAeropuertos() {
    this.aeropuertoService.obtenerAeropuertos().subscribe(listaAeropuertos => {
      this.aeropuertos = listaAeropuertos
    })
  }

  // crearVuelo() {
  //   this.vueloFormulario.valid
  //   // Obtener los aeropuertos seleccionados para origen y destino del vuelo
  //   const aeropuertoOrigenSeleccionado = this.aeropuertos.find(a => a.aeroId === this.vuelos.find(e => e.aeropuerto_aeroIdOrigen));
  //   const aeropuertoDestinoSeleccionado = this.aeropuertos.find(a => a.aeroId === this.vuelos.find(e => e.aeropuerto_aeroIdDestino));

  //   // Asignar los aeropuertos seleccionados al modelo de vuelo
  //   this.vuelos.find(e=> e.aeropuerto_aeroIdOrigen) == aeropuertoOrigenSeleccionado;
  //   this.vuelos.find(e=> e.aeropuerto_aeroIdDestino) == aeropuertoDestinoSeleccionado;

  //   //Enviar el form
  //   const VueloCrear: Vuelo = {
  //     aeropuerto_aeroIdOrigen: parseInt(this.vueloFormulario.controls['aeroOrigen_1'].value),
  //     aeropuerto_aeroIdDestino: parseInt(this.vueloFormulario.controls['aeroDestino_1'].value),
  //     nombreAeroOrigen: this.vueloFormulario.controls['aeroOrigen_1'].value,
  //     nombreAeroDestino: this.vueloFormulario.controls['aeroDestino_1'].value,
  //     precio: this.vueloFormulario.controls['precioVuelo'].value,
  //     hora_salida: this.vueloFormulario.controls['fechaOrigen_1'].value,
  //     hora_llegada: this.vueloFormulario.controls['fechaDestino_1'].value,
  //     precioAsientoVip: parseInt(this.vueloFormulario.controls['precioAsientoVip'].value),
  //     precioAsientoNormal: parseInt(this.vueloFormulario.controls['precioAsientoNormal'].value),
  //     precioAsientoBasico: parseInt(this.vueloFormulario.controls['precioAsientoBasico'].value),
  //     estado: 'Activo'
  //   }
  //   this.vueloService.crearVuelo(VueloCrear)?.subscribe(
  //     vuelo => {
  //       if (vuelo == null) {
  //         console.log('No se puede crear el vuelo')
  //         return
  //       /*}if (vuelo.vueloId == undefined) {
  //         console.log('El id del vuelo es indefinido')
  //         return*/
  //       }else {
  //         console.log('Vuelo creado con éxito')
  //         this.vueloFormulario.reset()
  //       }
  //     },
  //     errorVuelo => {
  //       let errorMensaje = 'Error al crear el vuelo';

  //       if (errorVuelo.error && errorVuelo.error.mensaje) {
  //         errorMensaje = errorVuelo.error.mensaje;
  //       }
  //       console.log(errorMensaje, 'Error');
  //     }
  //   )

  // }

}
