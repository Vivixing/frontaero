import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Avion } from 'src/app/interfaces/avion';
import { AvionService } from 'src/app/services/avion.service';

@Component({
  selector: 'app-crear-avion',
  templateUrl: './crear-avion.component.html',
  styleUrls: ['./crear-avion.component.css']
})
export class CrearAvionComponent implements OnInit{

  constructor(private avionService:AvionService,
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
        this.avionFormulario.reset()
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
