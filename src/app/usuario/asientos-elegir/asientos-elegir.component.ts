import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import {Asiento} from 'src/app/interfaces/asiento';
import {AsientoService} from 'src/app/services/asiento.service';
import { Reserva } from 'src/app/interfaces/reserva';
import { ReservaService } from 'src/app/services/reserva.service';

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
  avionId : number = 0;
  vueloId : number = 0;
  usuarioId:number = 0;
  constructor(private asientosService : AsientoService, private route: ActivatedRoute, 
             private reservaService:ReservaService, private router:Router){}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.usuarioId = params['usuario'];
      console.log(this.usuarioId); // Verificar si el valor se actualiza correctamente
    });
      this.route.params.subscribe(params => {
      this.avionId = params['id'];
      console.log(this.avionId); // Verificar si el valor se actualiza correctamente
    });

    this.route.params.subscribe(params => {
      this.vueloId = params['vuelo'];
      console.log(this.vueloId); // Verificar si el valor se actualiza correctamente
    });

    this.asientosService.obtenerAsientos().subscribe(
      (e) => {
        // Filtrar los asientos para cada tipo
        this.asientos = e.filter((asiento) => asiento.avion_avioId == this.avionId);
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
    //Se crea una reserva con el asiento elegido y el usuario logueado
    if(asiento.asieId != undefined)
    {
      const reserva : Reserva = {
        asieId : asiento.asieId,
        usuaId : this.usuarioId,
        estado : "Activo",
        fecha : new Date(),
        estadoPago : "Pendiente",
        precioTotal : 1,
        vuelId : this.vueloId
    }
    console.log(reserva);
    //Se guarda la reserva en la base de datos
    this.reservaService.crearReserva(reserva).subscribe(
      e => console.log(e)
    )
    //Se muestra un mensaje de confirmacion
    //alert("Asiento reservado con exito")
    //Se redirige al usuario a la pagina de reservas
    //this.router.navigate(['/usuario/reservaUsuario']);
    }
  //Si el asiento no esta disponible, se muestra un mensaje
  else{
    alert("Por favor, seleccione un asiento disponible")
  }
}
  }

}
