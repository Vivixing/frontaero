import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { LocacionService } from 'src/app/services/locacion.service';
import { Pais } from 'src/app/interfaces/pais';


@Component({
  selector: 'app-crear-aeropuerto',
  templateUrl: './crear-aeropuerto.component.html',
  styleUrls: ['./crear-aeropuerto.component.css']
})
export class CrearAeropuertoComponent implements OnInit {

  //paises: any[] = [];
  ciudades: String[] = [];
  paises: Pais[] = [];
  IataenUso: boolean = false

  constructor(private aeropuertosService: AeropuertosService,
    private locationService: LocacionService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.locationService.obtenerPaises().subscribe(
      (paises) => {
        this.paises = paises.data;
        //console.log(paises);
      },
      (error) => {
        console.log('Error al encontrar paises:', error);
      }
    );

  }
  aeropuertoformulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(5), Validators.pattern(/^[a-zA-Z]?[A-Za-z-]+$/)]],
    iata: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern(/^[A-Za-z]+$/)]],
    pais: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
  })

  encontrarCiudades() {
    this.ciudades = []
    const elPais = this.paises.filter(elPais => elPais.country == this.aeropuertoformulario.value['pais'])
    this.ciudades = elPais[0].cities
  }
  crearAeropuerto(): void {
    const aeropuerto: Aeropuerto = {
      nombre: this.aeropuertoformulario.value['nombre'],
      iata: this.aeropuertoformulario.value['iata'],
      ubicacion: `${this.aeropuertoformulario.value['pais']}  ${this.aeropuertoformulario.value['ciudad']}`,
      estado: 'Activo'      
    };
    this.aeropuertoformulario.valid,
    //console.log(aeropuerto);
    this.enviarAeropuerto(aeropuerto)
    this.aeropuertoformulario.reset()
  }

  enviarAeropuerto(aeropuerto: Aeropuerto) {
    this.aeropuertosService.crearAeropuerto(aeropuerto)?.subscribe(
      res => {
      if (res == null) {
        console.log('No se puedo crear el aeropuerto')
        return
      }
      console.log(res,'Aeropuerto creado con éxito');
      this.router.navigate(["/administrador/aeropuertosListadoAdmin"])
    },
      err => {
        let MensajeError = 'Error al crear el aeropuerto'
        if (err.error && err.error.mensaje) {
          MensajeError = err.error.mensaje;
        }
        console.log(MensajeError);
      })
  }

  // validarIata(aeropuerto: Aeropuerto[], iata: string): boolean {

  //   const respuesta = aeropuerto.filter(res => res.iata === iata)

  //   if (respuesta.length == 0) {
  //     this.IataenUso = false
  //     return false
  //   }
  //   this.IataenUso = true
  //   return true
  // }

}



