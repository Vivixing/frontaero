import { Component,OnInit,Input } from '@angular/core';
import { VueloModelo } from 'src/app/interfaces/vuelo';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit{

  @Input() listadoVuelos !:VueloModelo[];
  aeropuertos:Aeropuerto[]=[];

  constructor(private aeropuertoService:AeropuertosService,private fb:FormBuilder){}
  
  ngOnInit(): void {
    this.aeropuertoService.obtenerAeropuertos().subscribe( response =>{
      this.aeropuertos = response
      this.aeropuertos = this.aeropuertos.filter(aeropuerto=> aeropuerto.estado === 'Activo' || aeropuerto.estado ==='Activa')
    })
  }

  viajeForm: FormGroup = this.fb.group({
    viajeOrigen:[Validators.required],
    viajeDestino:[Validators.required]
  })

}
