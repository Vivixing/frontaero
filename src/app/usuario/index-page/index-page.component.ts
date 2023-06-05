import { Component, OnInit, Input } from '@angular/core';
import { VueloModelo } from 'src/app/interfaces/vuelo';
import { Aeropuerto } from 'src/app/interfaces/aeropuerto';
import { AeropuertosService } from 'src/app/services/aeropuertos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuscadorVueloService } from 'src/app/services/buscador-vuelo.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {

  @Input() listadoVuelos !: VueloModelo[];
  aeropuertos: Aeropuerto[] = [];
  buscadorVuelos : VueloModelo[] =[];

  constructor(private aeropuertoService: AeropuertosService, private fb: FormBuilder, private buscadorVuelosService: BuscadorVueloService) { }

  ngOnInit(): void {
    this.aeropuertoService.obtenerAeropuertos().subscribe(response => {
      this.aeropuertos = response
      this.aeropuertos = this.aeropuertos.filter(aeropuerto => aeropuerto.estado === 'Activo' || aeropuerto.estado === 'Activa')
    })
  }

  viajeForm: FormGroup = this.fb.group({
    viajeOrigen: [Validators.required],
    viajeDestino: [Validators.required]
  })

  enviarFormulario(){
    if(this.viajeForm.valid){
      this.filtroVuelo(this.viajeForm.value['viajeOrigen'],this.viajeForm.value['viajeDestino'])
    }
  }

  filtroVuelo(aeropuertoOrigen:string, aeropuertoDestino:string){
    this.buscadorVuelos = this.listadoVuelos.filter(vuelo=> vuelo.aeropuerto_aeroIdOrigen.aeroId === parseInt(aeropuertoOrigen))
    this.buscadorVuelos = this.listadoVuelos.filter(vuelo=> vuelo.aeropuerto_aeroIdDestino.aeroId === parseInt(aeropuertoDestino))
    this.buscadorVuelosService.asignarVuelosBuscados(this.buscadorVuelos)
    this.viajeForm.reset()
  }

}
