import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import {Asiento} from 'src/app/interfaces/asiento';
import {AsientoService} from 'src/app/services/asiento.service';
import { Reserva } from 'src/app/interfaces/reserva';
import { ReservaService } from 'src/app/services/reserva.service';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { VueloService } from 'src/app/services/vuelo.service';
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
  total:number = 0;
  constructor(private asientosService : AsientoService, private route: ActivatedRoute, 
            private reservaService:ReservaService, private router:Router, private vueloService:VueloService){}
  
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

  elegirAsiento(asiento: Asiento) {
    console.log(asiento);
    
    // Verificar si el asiento está disponible
    if (asiento.estado == "Activo") {
      // Cambiar el estado del asiento a reservado y guardarlo en la base de datos
      asiento.estado = "Inactivo";
      this.asientosService.actualizarAsiento(asiento).subscribe(e => console.log(e));
      
      this.vueloService.obtenerVueloById(this.vueloId).subscribe(vuelo => {
        // Aquí se obtiene el valor real del objeto 'Vuelo'
        
        // Crear una reserva con el asiento elegido y el usuario logueado
        if (asiento.asieId != undefined) {
          const reserva: Reserva = {
            asieId: asiento.asieId,
            usuaId: this.usuarioId,
            estado: "Activo",
            fecha: new Date(),
            estadoPago: "Pendiente",
            precioTotal: asiento.precio + vuelo.precio,
            vuelId: this.vueloId
          };
          console.log(reserva);
          
          // Guardar la reserva en la base de datos
          this.reservaService.crearReserva(reserva).subscribe(e => console.log(e));
          
          // Redirigir al usuario a la página de reservas
          this.router.navigate(['/usuario/reservaUsuario', this.usuarioId, this.vueloId]);
        }
      });
    } else {
      // Si el asiento no está disponible, mostrar un mensaje
      alert("Por favor, seleccione un asiento disponible");
    }
  }

}
