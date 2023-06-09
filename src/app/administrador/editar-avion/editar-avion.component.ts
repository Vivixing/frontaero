import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Avion } from 'src/app/interfaces/avion';
import { AvionService } from 'src/app/services/avion.service';
import { Asiento } from 'src/app/interfaces/asiento';
import { AsientoService } from 'src/app/services/asiento.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-avion',
  templateUrl: './editar-avion.component.html',
  styleUrls: ['./editar-avion.component.css']
})
export class EditarAvionComponent implements OnInit{

  avioID: number = 0;
  constructor(private avionService: AvionService,
    private asientoService: AsientoService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toast: ToastrService) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.avioID = params['id'];
      this.buscarAvion();
      console.log(this.avioID); // Verificar si el valor se actualiza correctamente
    });
  }

  avionFormulario: FormGroup = this.fb.group({
    modelo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z]{5,}[0-9]{3,}[\/\-]?[a-zA-Z0-9\/\-]*$/)]],
    estado:['',[Validators.required,Validators.pattern(/^[A-Za-z]+$/)]]
  })
  
  buscarAvion(): void {
    //Buscamos el avión por su id, para luego mostrarlo en el formulario
    this.avionService.obtenerAvionById(this.avioID)?.subscribe(data => {
      if (data == null) {
        console.log('No se puede encontrar el avión');
        return;
      } else {
        console.log('Avión encontrado');
        console.log(data);
        this.avionFormulario.patchValue({
          modelo: data.modelo,
          estado: data.estado
        });
      }
    });
  }
  actualizarAvion(): void {
    const avion: Avion = {
      avioID: this.avioID,
      modelo: this.avionFormulario.value['modelo'],
      estado: this.avionFormulario.value['estado']
    };
    console.log(avion);
    avion.avioID=this.avioID
    this.avionService.actualizarAvion(avion)?.subscribe(data => {
      if (data == null) {
        this.toast.error('No se puede actualizar el avión');
        console.log('No se puede actualizar el avión');
        return;
      } else {
        this.toast.success('Avión actualizado con éxito');
        console.log('Avión actualizado con éxito');
        /*
        const avionId = data.avioID;
        if (avionId) {
          //Creamos 3 asientos para clase económica, 3 para clase ejecutiva y 3 para primera clase
          const asiento1: Asiento = {
            tipoAsiento_tiasId: 55,
            avion_avioId: avionId,
            ubicacion: 'Ventana',
            precio: 100,
            estado: 'Activo',
            nombreTipoAsiento: 'Primera Clase',
            ModeloAvion: data.modelo
          }
          const asiento2: Asiento = {
            tipoAsiento_tiasId: 55,
            avion_avioId: avionId,
            ubicacion: 'Pasillo',
            precio: 100,
            estado: 'Activo',
            nombreTipoAsiento: 'Primera Clase',
            ModeloAvion: data.modelo
          }
          const asiento3: Asiento = {
            tipoAsiento_tiasId: 55,
            avion_avioId: avionId,
            ubicacion: 'Centro',
            precio: 100,
            estado: 'Activo',
            nombreTipoAsiento: 'Primera Clase',
            ModeloAvion: data.modelo
          }
          const asiento4: Asiento = {
            tipoAsiento_tiasId: 56,
            avion_avioId: avionId,
            ubicacion: 'Ventana',
            precio: 100,
            estado: 'Activo',
            nombreTipoAsiento: 'Clase Ejecutiva',
            ModeloAvion: data.modelo
          }
          const asiento5: Asiento = {
            tipoAsiento_tiasId: 56,
            avion_avioId: avionId,
            ubicacion: 'Pasillo',
            precio: 100,
            estado: 'Activo',
            nombreTipoAsiento: 'Clase Ejecutiva',
            ModeloAvion: data.modelo
          }

          const asiento6: Asiento = {
            tipoAsiento_tiasId: 56,
            avion_avioId: avionId,
            ubicacion: 'Centro',
            precio: 100,
            estado: 'Activo',
            nombreTipoAsiento: 'Clase Ejecutiva',
            ModeloAvion: data.modelo
          }

          const asiento7: Asiento = {
            tipoAsiento_tiasId: 57,
            avion_avioId: avionId,
            ubicacion: 'Salida de Emergencia',
            precio: 100,
            estado: 'Activo',
            nombreTipoAsiento: 'Clase Económica',
            ModeloAvion: data.modelo
          }

          const asiento8: Asiento = {
            tipoAsiento_tiasId: 57,
            avion_avioId: avionId,
            ubicacion: 'Pasillo',
            precio: 100,
            estado: 'Activo',
            nombreTipoAsiento: 'Clase Económica',
            ModeloAvion: data.modelo
          }

          const asiento9: Asiento = {
            tipoAsiento_tiasId: 57,
            avion_avioId: avionId,
            ubicacion: 'Centro',
            precio: 100,
            estado: 'Activo',
            nombreTipoAsiento: 'Clase Económica',
            ModeloAvion: data.modelo
          }

          //Guardamos el asiento
          this.asientoService.crearAsiento(asiento1)?.subscribe(data => {
            if (data == null) {
              console.log('No se puede crear el asiento');
              return;
            } else {
              console.log('Asiento creado con éxito');
            }
          }
          )
          this.asientoService.crearAsiento(asiento2)?.subscribe(data => {
            if (data == null) {
              console.log('No se puede crear el asiento');
              return;
            } else {
              console.log('Asiento creado con éxito');
            }
          }
          )
          this.asientoService.crearAsiento(asiento3)?.subscribe(data => {
            if (data == null) {
              console.log('No se puede crear el asiento');
              return;
            } else {
              console.log('Asiento creado con éxito');
            }
          }
          )
          this.asientoService.crearAsiento(asiento4)?.subscribe(data => {
            if (data == null) {
              console.log('No se puede crear el asiento');
              return;
            } else {
              console.log('Asiento creado con éxito');
            }
          }
          )
          this.asientoService.crearAsiento(asiento5)?.subscribe(data => {
            if (data == null) {
              console.log('No se puede crear el asiento');
              return;
            } else {
              console.log('Asiento creado con éxito');
            }
          }
          )
          this.asientoService.crearAsiento(asiento6)?.subscribe(data => {
            if (data == null) {
              console.log('No se puede crear el asiento');
              return;
            } else {
              console.log('Asiento creado con éxito');
            }
          }
          )
          this.asientoService.crearAsiento(asiento7)?.subscribe(data => {
            if (data == null) {
              console.log('No se puede crear el asiento');
              return;
            } else {
              console.log('Asiento creado con éxito');
            }
          }
          )
          this.asientoService.crearAsiento(asiento8)?.subscribe(data => {
            if (data == null) {
              console.log('No se puede crear el asiento');
              return;
            } else {
              console.log('Asiento creado con éxito');
            }
          }
          )
          this.asientoService.crearAsiento(asiento9)?.subscribe(data => {
            if (data == null) {
              console.log('No se puede crear el asiento');
              return;
            } else {
              console.log('Asiento creado con éxito');
            }
          }
          )

        };
        */
        this.avionFormulario.reset()
        this.router.navigate(["/administrador/avionesListadoAdmin"])
      }
    },
    (err:HttpErrorResponse)=>{
      if(err.status == 400){
        console.log(err.error);
        const mensaje = err.error.mensaje;
        this.toast.error(mensaje);
      }
    })

  }
}
