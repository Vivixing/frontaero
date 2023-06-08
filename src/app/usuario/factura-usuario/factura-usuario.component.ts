import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/interfaces/factura';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FacturaService } from 'src/app/services/factura.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { Reserva } from 'src/app/interfaces/reserva';
import { ActivatedRoute } from '@angular/router';
import { Asiento } from 'src/app/interfaces/asiento';
import { AsientoService } from 'src/app/services/asiento.service';


@Component({
  selector: 'app-factura-usuario',
  templateUrl: './factura-usuario.component.html',
  styleUrls: ['./factura-usuario.component.css']
})
export class FacturaUsuarioComponent implements OnInit {
  reservaId: number = 0;
  factura: Factura = {
    reseId: 0,
    fecha: new Date(),
    estado: ''
  }
  usuario: Usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    cedula: '',
    estado: ''
  }
  
  reservas: Reserva[] = [];
  asientos: Asiento[] = [];
  idVuelo: number = 0;
  total: number = 0;
  constructor(
    private usuarioService: UsuarioService,
    private facturaService: FacturaService,
    private reservaService: ReservaService,
    private route: ActivatedRoute,
    private asientoService: AsientoService
  ) { }

  ngOnInit(): void {
    //obtener los datos de la factura
    this.route.params.subscribe(params => {
      this.reservaId = params['id'];
      console.log(this.reservaId); // Verificar si el valor se actualiza correctamente
    });
    //obtener los datos del avión
    this.route.params.subscribe(params => {
      this.idVuelo = params['vuelo'];
      console.log(this.idVuelo); // Verificar si el valor se actualiza correctamente
    });
    /*
    this.facturaService.obtenerFacturaById(this.facturaId).subscribe(factura => {
      this.factura = factura;
      console.log(this.factura);
      */
  
      //obtenemos los datos de la reserva
      this.reservaService.obtenerReservaById(this.reservaId).subscribe(reserva => {
        this.reservas.push(reserva);
        console.log(this.reservas);

        //obtenemos los datos del usuario
        this.usuarioService.obtenerUsuarioById(this.reservas[0].usuaId).subscribe(usuario => {
          this.usuario = usuario;
          console.log(this.usuario);

          //obtenemos todas las reservas del usuario asociadas a ese vuelo
          if (this.usuario.usuaId) {

            this.reservaService.obtenerReservaDelUsuario(this.usuario.usuaId).subscribe(reservas => {
              //filtramos las reservas que están activas
              this.reservas = reservas.filter(reserva => reserva.estado == 'Activo');
              console.log(this.reservas);
              //Por cada reserva, obtenemos el asiento
              this.reservas.forEach(reserva => {
                this.asientoService.obtenerAsientoById(reserva.asieId).subscribe(asiento => {
                  this.asientos.push(asiento);
                  console.log(this.asientos);
                  this.total= reserva.precioTotal + this.total;
                  reserva.estadoPago = 'Pagado';
                  reserva.estado = 'Inactivo';
                  this.reservaService.actualizarReserva(reserva).subscribe(reserva => {
                    console.log(reserva);
                  }
                  );
                });
              }
              );
            });
          }
        });
      });
    };





    //obtener los datos del usuario
    //this.usuarioService.obtenerUsuarios().subscribe((usuarios: Usuario[])=>{
    //  if (usuarios.length > 0) {
    //    this.usuario = usuarios[0];
    //  }

    // });
    //obtener los datos de la reserva 
    /*
    if(this.usuario.usuaId){
      this.reservaService.obtenerReservaDelUsuario(this.usuario.usuaId).subscribe((reservas:Reserva[])=>{
        if(reservas.length>0){
          this.reserva=reservas[0];
        }
        
  
      }
      );
     
    }
    

    
     */
  }



