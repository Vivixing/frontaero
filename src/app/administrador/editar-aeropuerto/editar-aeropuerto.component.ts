import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { Pais } from 'src/app/interfaces/pais';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { LocacionService } from 'src/app/services/locacion.service';

@Component({
  selector: 'app-editar-aeropuerto',
  templateUrl: './editar-aeropuerto.component.html',
  styleUrls: ['./editar-aeropuerto.component.css']
})
export class EditarAeropuertoComponent {
  //paises: any[] = [];
  aeroId: number = 0;
  ciudades: String[] = [];
  paises: Pais[] = [];
  IataenUso: boolean = false

  constructor(private aeropuertosService: AeropuertosService,
    private locationService: LocacionService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.aeroId = params['id'];
      console.log(this.aeroId); // Verificar si el valor se actualiza correctamente
    });
    
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
    estado:['',[Validators.required,Validators.pattern(/^[A-Za-z]+$/)]],
  })

  encontrarCiudades() {
    this.ciudades = []
    const elPais = this.paises.filter(elPais => elPais.country == this.aeropuertoformulario.value['pais'])
    this.ciudades = elPais[0].cities
  }
  actualizarAeropuerto(): void {
    console.log(this.route.snapshot.params['aeroId']);
    const aeropuerto: Aeropuerto = {
      aeroId: this.aeroId,
      nombre: this.aeropuertoformulario.value['nombre'],
      iata: this.aeropuertoformulario.value['iata'],
      ubicacion: `${this.aeropuertoformulario.value['pais']}  ${this.aeropuertoformulario.value['ciudad']}`,
      estado: this.aeropuertoformulario.value['estado']      
    };
    this.aeropuertoformulario.valid,
    //console.log(aeropuerto);
    this.enviarAeropuerto(aeropuerto)
    this.aeropuertoformulario.reset()
  }

  enviarAeropuerto(aeropuerto: Aeropuerto) {
    aeropuerto.aeroId=this.aeroId
    this.aeropuertosService.actualizarAeropuerto(aeropuerto)?.subscribe(
      res => {
      if (res == null) {
        console.log('No se puedo actualizar el aeropuerto')
        return
      }
      console.log(res,'Aeropuerto actualizado con éxito');
      this.router.navigate(["/administrador/aeropuertosListadoAdmin"])
    },
      err => {
        let MensajeError = 'Error al actualizar el aeropuerto'
        if (err.error && err.error.mensaje) {
          MensajeError = err.error.mensaje;
        }
        console.log(MensajeError);
      })
  }
}
