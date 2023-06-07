import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VueloService } from 'src/app/services/vuelo.service';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { Vuelo } from 'src/app/interfaces/vuelo';

@Component({
  selector: 'app-editar-vuelo',
  templateUrl: './editar-vuelo.component.html',
  styleUrls: ['./editar-vuelo.component.css']
})
export class EditarVueloComponent implements OnInit {

  aeropuertos: Aeropuerto[] = [];
  vueloForm: FormGroup

  vueloId: number = 0;
  constructor(private vueloService: VueloService,
    private fb: FormBuilder, private aeropuertoService: AeropuertosService, private router: Router, private route: ActivatedRoute) {
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
      estado: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.vueloId = params['id'];
      console.log(this.vueloId); // Verificar si el valor se actualiza correctamente
    });
    this.buscarVuelo();
    this.getAeropuertos()
  }

  buscarVuelo() {
    this.vueloService.obtenerVueloById(this.vueloId).subscribe(
      (res: any) => {
        console.log(res);
        this.vueloForm.patchValue({
          origen: res.aeropuerto_aeroIdOrigen,
          destino: res.aeropuerto_aeroIdDestino,
          tieneEscalas: res.tieneEscalas,
          precioVuelo: res.precio,
          fechaHoraSalida: res.fechaHoraSalida,
          fechaHoraLlegada: res.fechaHoraLlegada,
          precioAsientoVip: res.precioAsientoVip,
          precioAsientoNormal: res.precioAsientoNormal,
          precioAsientoBasico: res.precioAsientoBasico,
          estado: res.estado
        });

      },
      err => {
        console.log(err);
      }
    );
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
      //const fechaHoraSalida = this.vueloForm.get('fechaHoraSalida')?.value;
      const fechaHoraSalida = new Date(datosVuelo.fechaHoraSalida).getTime();
      const fechaHoraLlegada = new Date(datosVuelo.fechaHoraLlegada).getTime();
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
      
      const VueloActualizar: Vuelo = {
        vueloId: this.vueloId,
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
        estado: this.vueloForm.value['estado']
      }
      this.vueloService.actualizarVuelo(VueloActualizar).subscribe((response) => {
        if (response !== null) {
          console.log('Actualizado exitosamente el vuelo', VueloActualizar)
          this.vueloForm.reset();
          this.router.navigate(['/administrador/vuelosListadoAdmin']);
        }
      },
        (error) => {
          console.error('Error al actualizar el vuelo', error);
        });
    }
    this.vueloForm.invalid

  }

  getAeropuertos() {
    this.aeropuertoService.obtenerAeropuertos().subscribe(listaAeropuertos => {
      this.aeropuertos = listaAeropuertos
    })
  }
}
