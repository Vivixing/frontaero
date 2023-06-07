import { Component, OnInit } from '@angular/core';
import {Asiento} from 'src/app/interfaces/asiento';
import {AsientoService} from 'src/app/services/asiento.service';

@Component({
  selector: 'app-asientos-elegir',
  templateUrl: './asientos-elegir.component.html',
  styleUrls: ['./asientos-elegir.component.css']
})

export class AsientosElegirComponent implements OnInit{

  asientos : Asiento[] = [];
  asientosVentana: Asiento[] = [];
  asientosPasillo : Asiento[] = [];
  asientosCentro : Asiento[] = [];
  constructor(private asientosService : AsientoService){}
  
  ngOnInit(): void {
    this.asientosService.obtenerAsientos().subscribe(
      (e) => {
        // Filtrar los asientos para cada tipo
        this.asientos = e.filter((asiento) => asiento.avion_avioId == 19);
        this.asientosVentana = this.asientos.filter(
          (asiento) => asiento.ubicacion === "Ventana"
        );
        this.asientosCentro = this.asientos.filter(
          (asiento) => asiento.ubicacion === "Centro"
        );
        this.asientosPasillo = this.asientos.filter(
          (asiento) => asiento.ubicacion === "Pasillo"
        );
      }
    );
  }

  elegirAsiento(asiento : Asiento){
    console.log(asiento);
    //Verificar si el asiento esta disponible
    if(asiento.estado == "Activo"){
      //Se cambia el estado del asiento a reservado, y se guarda en la base de datos
    asiento.estado = "Inactivo";
    this.asientosService.actualizarAsiento(asiento).subscribe(
      e => console.log(e)
    )
  }
  //Si el asiento no esta disponible, se muestra un mensaje
  else{
    alert("Por favor, seleccione un asiento disponible")
  }
}

}
