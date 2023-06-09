import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { LocacionService } from 'src/app/services/locacion.service';
import { Pais } from 'src/app/interfaces/pais';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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
    private fb: FormBuilder,
    private toast: ToastrService) { }

  ngOnInit(): void {

    this.locationService.obtenerPaises().subscribe(
      (paises) => {
        this.paises = paises.data;
      },
      (error) => {
        this.toast.error('Error al obtener paises',error)
      }
    );

  }
  aeropuertoformulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5), Validators.pattern(/^[a-zA-Z]?[A-Za-z-]+$/)]],
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
      ubicacion: `${this.aeropuertoformulario.value['pais']}, ${this.aeropuertoformulario.value['ciudad']}`,
      estado: 'Activo'      
    };
    this.aeropuertoformulario.valid,
    this.enviarAeropuerto(aeropuerto)
    this.aeropuertoformulario.reset()
  }

  enviarAeropuerto(aeropuerto: Aeropuerto) {
    this.aeropuertosService.crearAeropuerto(aeropuerto)?.subscribe(
      res => {
      if (res == null) {
        console.log('No se puedo crear el aeropuerto')
        this.toast.error('¡Algo salió mal!',res)
        alert('No se puedo crear el aeropuerto')
        return
      }
      this.toast.success('Aeropuerto creado con éxito')
      console.log(res,'Aeropuerto creado con éxito');
      this.router.navigate(["/administrador/aeropuertosListadoAdmin"])
    },
    (err:HttpErrorResponse)=>{
      if(err.status == 400){
        console.log(err.error);
        const mensaje = err.error.mensaje;
        this.toast.error(mensaje);
      }
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



