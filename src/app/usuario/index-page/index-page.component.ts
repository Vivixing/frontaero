import { Component, OnInit, Input } from '@angular/core';
import { VueloModelo,Vuelo } from 'src/app/interfaces/vuelo';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuscadorVueloService } from 'src/app/services/buscador-vuelo.service';
import { VueloService } from 'src/app/services/vuelo.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {

  @Input() listadoVuelos !: VueloModelo[];
  aeropuertos: Aeropuerto[] = [];
  buscadorVuelos !: VueloModelo[];

  constructor(private aeropuertoService: AeropuertosService, private fb: FormBuilder, private buscadorVuelosService: BuscadorVueloService) { }

  ngOnInit(): void {
    this.aeropuertoService.obtenerAeropuertos().subscribe(response => {
      this.aeropuertos = response
      this.aeropuertos = this.aeropuertos.filter(aeropuerto => aeropuerto.estado === 'Activo')
    })
  }

  viajeForm: FormGroup = this.fb.group({
    viajeOrigen: ['',[Validators.required]],
    viajeDestino: ['',[Validators.required]]
  })
  
  enviarFormulario(){
    if(this.viajeForm.valid){     
      const origen = this.viajeForm.value['viajeOrigen']
      const destino = this.viajeForm.value['viajeDestino']
      this.filtroVuelo(origen, destino)
    }
  }

  filtroVuelo(aeropuertoOrigen:number, aeropuertoDestino:number){
    //Obtener aeropuerto del id
    this.aeropuertoService.obtenerAeropuertoById(aeropuertoOrigen).subscribe(response => {
      const aeropuertoOrigen = response
      console.log(aeropuertoOrigen)
    })
        
    this.buscadorVuelos = this.listadoVuelos.filter(vuelo => vuelo.aeropuerto_aeroIdOrigen.aeroId == aeropuertoOrigen && vuelo.aeropuerto_aeroIdDestino.aeroId == aeropuertoDestino)
    console.log(this.buscadorVuelos);
    
    this.buscadorVuelosService.asignarVuelosBuscados(this.buscadorVuelos);
    
  }

}
