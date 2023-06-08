import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Avion } from 'src/app/interfaces/avion';
import { AvionService } from 'src/app/services/avion.service';
import { Asiento } from 'src/app/interfaces/asiento';
import { AsientoService } from 'src/app/services/asiento.service';

@Component({
  selector: 'app-crear-avion',
  templateUrl: './crear-avion.component.html',
  styleUrls: ['./crear-avion.component.css']
})
export class CrearAvionComponent implements OnInit{

  constructor(private avionService:AvionService,
              private asientoService:AsientoService,
              private router : Router,
              private fb:FormBuilder){}

  ngOnInit(): void {
  }

  avionFormulario: FormGroup = this.fb.group({
    modelo:['',[Validators.required,Validators.maxLength(10),Validators.pattern(/^[a-zA-Z]{5,}[0-9]{3,}[\/\-]?[a-zA-Z0-9\/\-]*$/)],]
  })

  crearAvion():void{
    const avion : Avion ={
      modelo: this.avionFormulario.value['modelo'],
      estado: 'Activo'
    };
    console.log(avion);

    this.avionService.crearAvion(avion)?.subscribe(data=>{
      if(data==null){
        console.log('No se puede crear el avión');
        return;
      }else{
        console.log('Avión creado con éxito');
        const avionId = data.avioID;
        if (avionId) {
        //Creamos 3 asientos para clase económica, 3 para clase ejecutiva y 3 para primera clase
        const asiento1 : Asiento = {
          tipoAsiento_tiasId: 55,
          avion_avioId: avionId,
          ubicacion: 'Ventana',
          precio: 100,
          estado: 'Activo',
          nombreTipoAsiento: 'Primera Clase',
          ModeloAvion: data.modelo
        }
        const asiento2 : Asiento = {
          tipoAsiento_tiasId: 55,
          avion_avioId: avionId,
          ubicacion: 'Pasillo',
          precio: 100,
          estado: 'Activo',
          nombreTipoAsiento: 'Primera Clase',
          ModeloAvion: data.modelo
        }
        const asiento3 : Asiento = {
          tipoAsiento_tiasId: 55,
          avion_avioId: avionId,
          ubicacion: 'Centro',
          precio: 100,
          estado: 'Activo',
          nombreTipoAsiento: 'Primera Clase',
          ModeloAvion: data.modelo
        }
        const asiento4 : Asiento = {
          tipoAsiento_tiasId: 56,
          avion_avioId: avionId,
          ubicacion: 'Ventana',
          precio: 100,
          estado: 'Activo',
          nombreTipoAsiento: 'Clase Ejecutiva',
          ModeloAvion: data.modelo
        }
        const asiento5 : Asiento = {
          tipoAsiento_tiasId: 56,
          avion_avioId: avionId,
          ubicacion: 'Pasillo',
          precio: 100,
          estado: 'Activo',
          nombreTipoAsiento: 'Clase Ejecutiva',
          ModeloAvion: data.modelo
        }

        const asiento6 : Asiento = {
          tipoAsiento_tiasId: 56,
          avion_avioId: avionId,
          ubicacion: 'Centro',
          precio: 100,
          estado: 'Activo',
          nombreTipoAsiento: 'Clase Ejecutiva',
          ModeloAvion: data.modelo
        }

        const asiento7 : Asiento = {
          tipoAsiento_tiasId: 57,
          avion_avioId: avionId,
          ubicacion: 'Ventana',
          precio: 100,
          estado: 'Activo',
          nombreTipoAsiento: 'Clase Económica',
          ModeloAvion: data.modelo
        }

        const asiento8 : Asiento = {
          tipoAsiento_tiasId: 57,
          avion_avioId: avionId,
          ubicacion: 'Pasillo',
          precio: 100,
          estado: 'Activo',
          nombreTipoAsiento: 'Clase Económica',
          ModeloAvion: data.modelo
        }

        const asiento9 : Asiento = {
          tipoAsiento_tiasId: 57,
          avion_avioId: avionId,
          ubicacion: 'Centro',
          precio: 100,
          estado: 'Activo',
          nombreTipoAsiento: 'Clase Económica',
          ModeloAvion: data.modelo
        }

        //Guardamos el asiento
        this.asientoService.crearAsiento(asiento1)?.subscribe(data=>{
          if(data==null){
            console.log('No se puede crear el asiento');
            return;
          }else{
            console.log('Asiento creado con éxito');
          }
        }
        )
        this.asientoService.crearAsiento(asiento2)?.subscribe(data=>{
          if(data==null){
            console.log('No se puede crear el asiento');
            return;
          }else{
            console.log('Asiento creado con éxito');
          }
        }
        )
        this.asientoService.crearAsiento(asiento3)?.subscribe(data=>{
          if(data==null){
            console.log('No se puede crear el asiento');
            return;
          }else{
            console.log('Asiento creado con éxito');
          }
        }
        )
        this.asientoService.crearAsiento(asiento4)?.subscribe(data=>{
          if(data==null){
            console.log('No se puede crear el asiento');
            return;
          }else{
            console.log('Asiento creado con éxito');
          }
        }
        )
        this.asientoService.crearAsiento(asiento5)?.subscribe(data=>{
          if(data==null){
            console.log('No se puede crear el asiento');
            return;
          }else{
            console.log('Asiento creado con éxito');
          }
        }
        )
        this.asientoService.crearAsiento(asiento6)?.subscribe(data=>{
          if(data==null){
            console.log('No se puede crear el asiento');
            return;
          }else{
            console.log('Asiento creado con éxito');
          }
        }
        )
        this.asientoService.crearAsiento(asiento7)?.subscribe(data=>{
          if(data==null){
            console.log('No se puede crear el asiento');
            return;
          }else{
            console.log('Asiento creado con éxito');
          }
        }
        )
        this.asientoService.crearAsiento(asiento8)?.subscribe(data=>{
          if(data==null){
            console.log('No se puede crear el asiento');
            return;
          }else{
            console.log('Asiento creado con éxito');
          }
        }
        )
        this.asientoService.crearAsiento(asiento9)?.subscribe(data=>{
          if(data==null){
            console.log('No se puede crear el asiento');
            return;
          }else{
            console.log('Asiento creado con éxito');
          }
        }
        )

      };

        this.avionFormulario.reset()
        this.router.navigate(["/administrador/avionesListadoAdmin"])
      }
    },
    err=>{
      let errorMensaje = 'Error al crear el avión';

      if(err.error && err.error.mensaje){
        errorMensaje = err.error.mensaje;
      }

      console.log(errorMensaje);
    })

  }

  


}
