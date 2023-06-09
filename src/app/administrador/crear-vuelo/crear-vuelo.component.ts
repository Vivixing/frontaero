import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VueloService } from 'src/app/services/vuelo.service';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { Trayecto } from 'src/app/interfaces/trayecto';
import { TrayectoService } from 'src/app/services/trayecto.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-crear-vuelo',
  templateUrl: './crear-vuelo.component.html',
  styleUrls: ['./crear-vuelo.component.css']
})
export class CrearVueloComponent implements OnInit {

  aeropuertos: Aeropuerto[] = [];
  vueloForm: FormGroup


  constructor(private vueloService: VueloService,
    private fb: FormBuilder, private aeropuertoService: AeropuertosService, private router: Router, private trayectoService: TrayectoService, private toastr: ToastrService) {
    this.vueloForm = this.fb.group({
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      tieneEscalas: [false],
      precioVuelo: [Validators.required],
      fechaHoraSalida: ['', [Validators.required]],
      fechaHoraLlegada: ['', [Validators.required]],
      precioAsientoVip: [],
      precioAsientoNormal: [],
      precioAsientoBasico: [],
    });
  }

  ngOnInit(): void {
    this.getAeropuertos()
  }


  enviarFromulario() {
    if (this.vueloForm.valid) {
      const datosVuelo = this.vueloForm.value;
      // Realiza la validación de id de aeropuerto de origen y destino
      if (datosVuelo.origen === datosVuelo.destino) {
        this.toastr.error('El aeropuerto de origen y destino deben ser diferentes.');
        return;
      }
      //Validacioón fecha salida con la de llegada
      //const fechaHoraSalida = this.vueloForm.get('fechaHoraSalida')?.value;
      const fechaHoraSalida = new Date(datosVuelo.fechaHoraSalida).getTime();
      const fechaHoraLlegada = new Date(datosVuelo.fechaHoraLlegada).getTime();
      const fechaActualSistema = new Date().getTime();
      // const fechaHoraLlegada = this.vueloForm.get('fechaHoraLlegada')?.value;
      if (fechaHoraSalida >= fechaHoraLlegada) {
        this.toastr.error('La fecha hora de salida no puede ser igual o una fecha después que la de llegada')
        return;
      }
      //Validación fecha salida con Actual
      if (fechaHoraSalida < fechaActualSistema) {
        this.toastr.error('La fecha hora de salida no puede ser una fecha antes de la actual')
        return;
      }
      const VueloCrear: Vuelo = {
        aeropuerto_aeroIdOrigen: parseInt(this.vueloForm.controls['origen'].value),
        aeropuerto_aeroIdDestino: parseInt(this.vueloForm.controls['destino'].value),
        nombreAeroOrigen: this.vueloForm.controls['origen'].value,
        nombreAeroDestino: this.vueloForm.controls['destino'].value,
        precio: parseInt(this.vueloForm.controls['precioVuelo'].value),
        hora_salida: this.vueloForm.controls['fechaHoraSalida'].value,
        hora_llegada: this.vueloForm.controls['fechaHoraLlegada'].value,
        precioAsientoVip: parseInt(this.vueloForm.controls['precioAsientoVip'].value),
        precioAsientoNormal: parseInt(this.vueloForm.controls['precioAsientoNormal'].value),
        precioAsientoBasico: parseInt(this.vueloForm.controls['precioAsientoBasico'].value),
        estado: 'Activo'
      }
      this.vueloService.crearVuelo(VueloCrear).subscribe((response) => {
        if (response !== null) {
          console.log('Datos enviados éxitosamente al backend')
          this.toastr.success('Vuelo creado éxitosamente');
          //Creamos un trayecto para ese vuelo
          if(response.vueloId){
            const trayecto: Trayecto = {
              vuelId: response.vueloId,
              estado: 'Activo',
              horaSalida: this.vueloForm.controls['fechaHoraSalida'].value,
              horaLlegada: this.vueloForm.controls['fechaHoraLlegada'].value,
              aereoIdOrigen: this.vueloForm.controls['origen'].value,
              aereoIdDestino: this.vueloForm.controls['destino'].value,
              avioId: 19
          }
          this.trayectoService.crearTrayecto(trayecto).subscribe((response) => {
            if (response !== null) {
              console.log('Trayecto creado éxitosamente')
            }
          },
            (error) => {
              console.error('Error al enviar los datos al backend', error);
            });
          }

          this.vueloForm.reset();
          this.router.navigate(['/administrador/vuelosListadoAdmin']);
        }
      },
      (err:HttpErrorResponse)=>{
        if(err.status == 400){
          console.log(err.error);
          const mensaje = err.error.mensaje;
          this.toastr.error(mensaje);
        }
      });
    }
    this.vueloForm.invalid

  }

  getAeropuertos() {
    this.aeropuertoService.obtenerAeropuertosActivos().subscribe(listaAeropuertos => {
      this.aeropuertos = listaAeropuertos
    })
  }


}
