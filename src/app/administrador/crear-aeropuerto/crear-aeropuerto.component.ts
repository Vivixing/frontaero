import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { LocacionService } from 'src/app/services/locacion.service';
import { Pais } from 'src/app/interfaces/pais';
import { count } from 'rxjs';


@Component({
  selector: 'app-crear-aeropuerto',
  templateUrl: './crear-aeropuerto.component.html',
  styleUrls: ['./crear-aeropuerto.component.css']
})
export class CrearAeropuertoComponent implements OnInit {

  //paises: any[] = [];
  ciudades: string[] = [];
  paises: Pais[] = [];
  IataenUso: boolean = false

  constructor(private aeropuertosService: AeropuertosService,
    private locationService: LocacionService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.locationService.obtenerPaises().subscribe(
      (paises) => {
        this.paises = paises.data;
        console.log(paises);
      },
      (error) => {
        console.log('Error fetching countries:', error);
      }
    );
  }
  aeropuertoformulario: FormGroup = this.fb.group({
    //id :['',Validators.required],
    nombre: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(5), Validators.pattern(/^[a-zA-Z]?[A-Za-z-]+$/)]],
    pais: ['', Validators.required],
    ciudad: ['', Validators.required],
    iata: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern(/^[A-Za-z]+$/)]],
    ubicacion: ['', Validators.required]
  })

  /*loadCountries() {
    this.locationService.obtenerPaises().subscribe((data) => {
      this.paises = data;
    },
      error => {
        console.log('error al obtener los paises',error);
      });
  }*/

  /*
  buscarCiudades(pais: string) {
    this.locationService.obtenerCiudades(pais).subscribe(
      (data) => {
        this.ciudades = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  */

  crearAeropuerto(): void {
    this.aeropuertoformulario.valid
    const datos = this.aeropuertoformulario.value

    const aeropuerto: Aeropuerto = {
      nombre: datos.nombre,
      iata: datos.iata,
      ubicacion: `${datos.pais} - ${datos.ciudad}`,
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
      console.log('Aeropuerto creado con éxito');
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



