import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';


@Component({
  selector: 'app-crear-aeropuerto',
  templateUrl: './crear-aeropuerto.component.html',
  styleUrls: ['./crear-aeropuerto.component.css']
})
export class CrearAeropuertoComponent implements OnInit {

  IataenUso: boolean = false

  constructor(private aeropuertosService: AeropuertosService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  aeropuertoformulario: FormGroup = this.fb.group({
    //id :['',Validators.required],
    nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{6,30}?[A-Za-z-]+$/)]],
    iata: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(3) ,Validators.pattern(/^[A-Za-z]+$/)]],
    ubicacion: ['', Validators.required]
  })

  crearAeropuerto(): void {
    const datos = this.aeropuertoformulario.value

    const aeropuerto: Aeropuerto = {
      nombre: datos.nombre,
      iata: datos.iata,
      ubicacion: datos.ubicacion,
      estado: 'Activo'
    };
    console.log(aeropuerto);
    let listadoAeropuertos: Aeropuerto[] = []
    this.aeropuertosService.obtenerAeropuertos().subscribe(res => {
      listadoAeropuertos = res
      if (this.validarIata(listadoAeropuertos, datos.iata)) return

      this.enviarAeropuerto(aeropuerto)
      this.aeropuertoformulario.reset()
    })
  }

  enviarAeropuerto(datos: Aeropuerto) {
    this.aeropuertosService.crearAeropuerto(datos)?.subscribe(res => {
      if (res == null) {
        console.log('No se puedo crear el aeropuerto')
        return
      }
      console.log('Aeropuerto creado con éxito')
    },
      err => {
        let MensajeError = 'Error al crear el aeropuerto'
        if (err.error && err.error.mensaje) {
          MensajeError = err.error.mensaje;
        }
        console.log(MensajeError);
      })
  }

  validarIata(aeropuerto: Aeropuerto[], iata: string): boolean {

    const respuesta = aeropuerto.filter(res => res.iata === iata)

    if (respuesta.length == 0) {
      this.IataenUso = false
      return false
    }
    this.IataenUso = true
    return true
  }

}
