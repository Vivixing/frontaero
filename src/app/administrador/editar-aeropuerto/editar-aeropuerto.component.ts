import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { Pais } from 'src/app/interfaces/pais';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { LocacionService } from 'src/app/services/locacion.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
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
    private fb: FormBuilder,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.aeroId = params['id'];
      console.log(this.aeroId); // Verificar si el valor se actualiza correctamente
    });
    this.buscarAeropuerto();
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

    nombre: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5), Validators.pattern(/^[a-zA-Z]?[A-Za-z-]+$/)]],
    iata: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern(/^[A-Za-z]+$/)]],
    pais: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    estado: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
  })

  encontrarCiudades() {
    this.ciudades = []
    const elPais = this.paises.filter(elPais => elPais.country == this.aeropuertoformulario.value['pais'])
    this.ciudades = elPais[0].cities
  }
  //Buscamos el aeropuerto por su id
  buscarAeropuerto(): void {
    //Buscamos el aeropuerto por su id, para luego mostrarlo en el formulario
    this.aeropuertosService.obtenerAeropuertoById(this.aeroId).subscribe(
      (aeropuerto) => {
        console.log(aeropuerto);
        const ubicacionSplit = aeropuerto.ubicacion.split(', ');
        const ciudad = ubicacionSplit[1]
        const pais = ubicacionSplit[0]
        this.aeropuertoformulario.patchValue({
          nombre: aeropuerto.nombre,
          iata: aeropuerto.iata,
          pais: pais,
          ciudad: ciudad,
          estado: aeropuerto.estado
        })
        this.encontrarCiudades()
      }, (err: HttpErrorResponse) => {
        if (err.status == 400) {
          console.log(err.error);
          const mensaje = err.error.mensaje;
          this.toast.error(mensaje);
        }
      }
    );
  }
  actualizarAeropuerto(): void {
    if (this.aeropuertoformulario.valid) {
      console.log(this.route.snapshot.params['aeroId']);
      const aeropuerto: Aeropuerto = {
        aeroId: this.aeroId,
        nombre: this.aeropuertoformulario.value['nombre'],
        iata: this.aeropuertoformulario.value['iata'],
        ubicacion: `${this.aeropuertoformulario.value['pais']}, ${this.aeropuertoformulario.value['ciudad']}`,
        estado: this.aeropuertoformulario.value['estado']
      };
      this.enviarAeropuerto(aeropuerto)
      this.aeropuertoformulario.reset()
    }
  }

  enviarAeropuerto(aeropuerto: Aeropuerto) {
    aeropuerto.aeroId = this.aeroId
    this.aeropuertosService.actualizarAeropuerto(aeropuerto)?.subscribe(
      res => {
        if (res == null) {
          console.log('No se puedo actualizar el aeropuerto')
          return
        }
        this.toast.success('Aeropuerto actualizado con éxito')
        console.log(res, 'Aeropuerto actualizado con éxito');
        this.router.navigate(["/administrador/aeropuertosListadoAdmin"])
      },
      (err:HttpErrorResponse)=> {
        if(err.status == 400){
          console.log(err.error);
          const mensaje = err.error.mensaje;
          this.toast.error(mensaje);
        }
      })
  }
}
