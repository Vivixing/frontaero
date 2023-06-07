import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-gestionar-reserva',
  templateUrl: './gestionar-reserva.component.html',
  styleUrls: ['./gestionar-reserva.component.css']
})
export class GestionarReservaComponent implements OnInit {

  vueloId : string =""
  vuelo !: Vuelo
  trayecto !: Trayecto[]
  usuario !: Usuario
  ubicacionAsiento : string = ""
  precioTotal : number = 0

  reserva:Reserva={
    vuelId: 0,
    asieId: 0,
    usuaId: 0,
    precioTotal: 0,
    estadoPago: '',
    fecha: new Date(),
    estado: 'Activo'
  }

  constructor(private router: Router, private vueloService: VueloService,
    private usuarioService: UsuarioService, private reservaService: ReservaService, private facturaService:FacturaService) { }

  ngOnInit(): void {
    
  }
  

  obtenerPrecioTotal(): number{
    if(this.ubicacionAsiento[0] == 'Ventana'){
      this.precioTotal = this.vuelo.precioAsientoVip + this.vuelo.precio
      return 1
    }else if(this.ubicacionAsiento[0] == 'Pasillo'){
      this.precioTotal = this.vuelo.precioAsientoNormal + this.vuelo.precio
      return 2
    }else if(this.ubicacionAsiento[0]== 'Centro'){
      this.precioTotal = this.vuelo.precioAsientoBasico + this.vuelo.precio
      return 3
    }
    return 0
  }

  generarFactura(reserva:Reserva){
    if(reserva.reseId !== undefined){
      const crearFactura : Factura={
        reseId: reserva?.reseId,
        fecha: reserva.fecha,
        estado: 'Activo'
      }

      this.facturaService.crearFactura(crearFactura).subscribe(response=>{
        console.log('Factura generada con éxito', response);
      },
      error=>{
        console.error('Error al generar la factura', error);
      })
    }
  }

}

