import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { VueloService } from 'src/app/services/vuelo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Avion } from 'src/app/interfaces/avion';
import { AvionService } from 'src/app/services/avion.service';
import { Trayecto } from 'src/app/interfaces/trayecto';
import { TrayectoService } from 'src/app/services/trayecto.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-trayecto',
  templateUrl: './editar-trayecto.component.html',
  styleUrls: ['./editar-trayecto.component.css']
})
export class EditarTrayectoComponent implements OnInit {
  aeropuertos: Aeropuerto[] = [];
  vuelos: Vuelo[] = [];
  aviones: Avion[] = [];
  trayectoForm: FormGroup;

  trayId: number=0;
  constructor(private vueloService: VueloService, private avionService: AvionService, private trayectoService: TrayectoService,
    private fb: FormBuilder, private aeropuertoService: AeropuertosService, private router: Router, private route: ActivatedRoute) {
    this.trayectoForm = this.fb.group({
      avion: ['', [Validators.required]],
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      fechaHoraSalida: ['', [Validators.required]],
      fechaHoraLlegada: ['', [Validators.required]],
      vuelo: ['', [Validators.required]],
      estado:['',[Validators.required,Validators.pattern(/^[A-Za-z]+$/)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.trayId = params['id'];
      console.log(this.trayId); // Verificar si el valor se actualiza correctamente
    });
    this.buscarTrayecto()
    this.getAeropuertos()
    this.getAviones()
    this.getVuelos()
  }

  getAeropuertos() {
    this.aeropuertoService.obtenerAeropuertos().subscribe(listaAeropuertos => {
      this.aeropuertos = listaAeropuertos
    })
  }
  getAviones() {
    this.avionService.obtenerAviones().subscribe(listaAviones => {
      this.aviones = listaAviones
    })
  }
  getVuelos() {
    this.vueloService.obtenerVuelos().subscribe(listaVuelos => {
      this.vuelos = listaVuelos
    })
  }
  buscarTrayecto() {
    this.trayectoService.obtenerTrayectoById(this.trayId).subscribe(trayecto => {
      this.trayectoForm.patchValue({
        avion: trayecto.avioId,
        origen: trayecto.aereoIdOrigen,
        destino: trayecto.aereoIdDestino,
        fechaHoraSalida: trayecto.horaSalida,
        fechaHoraLlegada: trayecto.horaLlegada,
        vuelo: trayecto.vuelId,
        estado: trayecto.estado
      })
    })
  }

  enviarFormulario() {
    if (this.trayectoForm.valid) {
      const datosTrayecto = this.trayectoForm.value;
      // Realiza la validación de id de aeropuerto de origen y destino
      if (datosTrayecto.origen === datosTrayecto.destino) {
        alert('El aeropuerto de origen y destino deben ser diferentes.');
        return;
      }
      //Validacioón fecha salida con la de llegada
      const fechaHoraSalida = new Date(datosTrayecto.fechaHoraSalida).getTime();
      const fechaHoraLlegada = new Date(datosTrayecto.fechaHoraLlegada).getTime();
      const fechaActualSistema = new Date().getTime();
      // const fechaHoraLlegada = this.vueloForm.get('fechaHoraLlegada')?.value;
      if (fechaHoraSalida >= fechaHoraLlegada) {
        alert('La fecha hora de salida no puede ser igual o una fecha después que la de llegada')
        return;
      }
      //Validación fecha salida con Actual
      if (fechaHoraSalida < fechaActualSistema) {
        alert('La fecha hora de salida no puede ser una fecha antes de la actual')
        return;
      }
      const actualizarTrayecto: Trayecto = {
        trayId: this.trayId,
        avioId: this.trayectoForm.controls['avion'].value,
        aereoIdOrigen: parseInt(this.trayectoForm.controls['origen'].value),
        aereoIdDestino: parseInt(this.trayectoForm.controls['destino'].value),
        horaSalida: this.trayectoForm.controls['fechaHoraSalida'].value,
        horaLlegada: this.trayectoForm.controls['fechaHoraLlegada'].value,
        vuelId: this.trayectoForm.controls['vuelo'].value,
        estado: this.trayectoForm.controls['estado'].value,
      }
    
      this.trayectoService.actualizarTrayecto(actualizarTrayecto).subscribe(response => {
        if (response !== null) {
          console.log('Actualizado con éxito el trayecto',actualizarTrayecto)
          this.trayectoForm.reset();
          this.router.navigate(['/administrador/trayectosListadoAdmin']);
        }
      },
      (err:HttpErrorResponse)=>{
        if(err.status == 400){
          console.log(err.error);
          const mensaje = err.error.mensaje;
          alert(mensaje);
        }
      });
    }
    this.trayectoForm.invalid
  }

}
