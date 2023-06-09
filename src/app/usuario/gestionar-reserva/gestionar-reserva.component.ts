import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vuelo } from 'src/app/interfaces/vuelo';
import { Asiento } from 'src/app/interfaces/asiento';
import { VueloService } from 'src/app/services/vuelo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Trayecto } from 'src/app/interfaces/trayecto';
import { Reserva } from 'src/app/interfaces/reserva';
import { Factura } from 'src/app/interfaces/factura';
import { FacturaService } from 'src/app/services/factura.service';
import { AsientoService } from 'src/app/services/asiento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestionar-reserva',
  templateUrl: './gestionar-reserva.component.html',
  styleUrls: ['./gestionar-reserva.component.css']
})
export class GestionarReservaComponent implements OnInit {

  vuelo :Vuelo={
    aeropuerto_aeroIdOrigen: 0,
    aeropuerto_aeroIdDestino: 0,
    nombreAeroOrigen: '',
    nombreAeroDestino: '',
    precio: 0,
    hora_salida: new Date(),
    hora_llegada: new Date(),
    precioAsientoVip: 0,
    precioAsientoNormal: 0,
    precioAsientoBasico: 0,
    estado: 'Activo'
  };
  usuario :Usuario={
    cedula: '',
    nombre: '',
    apellido: '',
    correo: '',
    estado: 'Activo'
  }
  reservas:Reserva[]=[]
  usuarioId: number = 0;
  vueloId: number = 0;

  constructor(private router: Router, private vueloService: VueloService,
    private usuarioService: UsuarioService, private reservaService: ReservaService, private facturaService:FacturaService,
    private route: ActivatedRoute, private asientoService:AsientoService, private toast:ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.usuarioId = params['id'];
      console.log(this.usuarioId); // Verificar si el valor se actualiza correctamente
    });

    this.route.params.subscribe(params => {
      this.vueloId = params['vuelo'];
      console.log(this.vueloId); // Verificar si el valor se actualiza correctamente
    });
    //Obtener la reserva del Id Usuario
    this.reservaService.obtenerReservaDelUsuario(this.usuarioId).subscribe(response=>{
      this.reservas = response.filter((reserva)=>reserva.vuelId == this.vueloId && reserva.estado == 'Activo')
      console.log(this.reservas);
    },
    error=>{
      console.error('Error al traer el id del usuario',error);
    })
    //Obtener vuelo por Id
    this.vueloService.obtenerVueloById(this.vueloId).subscribe(response=>{
      this.vuelo = response
      console.log(this.vuelo);
    },
    error=>{
      console.error('Error al traer el id del vuelo',error);
    })
    //Obtener Ususario
    this.usuarioService.obtenerUsuarioById(this.usuarioId).subscribe(response=>{
      this.usuario = response
      console.log(this.usuario);
    },
    error=>{
      console.error('Error al encontrar el usuario por el Id',error);
    })
  }
  
  generarFactura(reserva:Reserva){
    if(reserva.reseId !== undefined){
      const crearFactura : Factura={
        reseId: reserva.reseId,
        fecha: reserva.fecha,
        estado: 'Activo'
      }
      this.facturaService.crearFactura(crearFactura).subscribe(response=>{
        console.log('Factura generada con éxito', response);
        //Obtenemos el id de la factura que acabamos de crear
        this.toast.success('Factura generada con éxito')
        console.log('IdFacturaPrueba',crearFactura.factId);
        this.router.navigate(['/usuario/facturaUsuario', reserva.reseId, this.vueloId]);
      },
      error=>{
        this.toast.error('Error al generar la factura')
        console.error('Error al generar la factura', error);
      })

    }
  }

  cancelarReserva(reserva:Reserva){
    if(reserva.reseId !== undefined){
      const crearFactura : Factura={
        reseId: reserva.reseId,
        fecha: reserva.fecha,
        estado: 'Activo'
      }
      //this.facturaService.actualizarFactura(crearFactura).subscribe(response=>{
        //console.log('Factura actualizada con éxito', response);
        
        //Inactivamos la reserva también
        if(reserva.reseId !== undefined){
          this.reservaService.eliminarReserva(reserva).subscribe(response=>{
            this.toast.success('Reserva cancelada con éxito')
            console.log('Reserva cancelada con éxito', response);
          },
          error=>{
            this.toast.error('Error al cancelar la reserva')
            console.error('Error al cancelar la reserva', error);
          })
          //Activamos los asientos de la reserva
          if(reserva.asieId !== undefined){
            //Obtenemos el asiento de la reserva
            this.asientoService.obtenerAsientoById(reserva.asieId).subscribe(response=>{
              const asiento : Asiento={
                asieId: response.asieId,
                precio: response.precio,
                tipoAsiento_tiasId: response.tipoAsiento_tiasId,
                ubicacion: response.ubicacion,
                nombreTipoAsiento: response.nombreTipoAsiento,
                ModeloAvion: response.ModeloAvion,
                avion_avioId: response.avion_avioId,
                estado: 'Activo'
              }
              //Actualizamos el asiento
              this.asientoService.actualizarAsiento(asiento).subscribe(response=>{
                console.log('Asiento activado con éxito', response);
              },
              error=>{
                console.error('Error al actualizar el asiento', error);
              })
            }
            )
          }
          this.router.navigate(['/usuario/escogerVuelo']);
        }
      }//,
      // error=>{
      //   console.error('Error al generar la factura', error);
      // })

    }
  }




