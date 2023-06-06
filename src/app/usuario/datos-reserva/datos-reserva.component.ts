import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ReservaModelo } from 'src/app/interfaces/reserva';
import { ReservaService } from 'src/app/services/reserva.service';


@Component({
  selector: 'app-datos-reserva',
  templateUrl: './datos-reserva.component.html',
  styleUrls: ['./datos-reserva.component.css']
})
export class DatosReservaComponent implements OnInit{

  datosReserva !: ReservaModelo
  listadoAeropuertos :any=[]
  
  constructor(private reservaService:ReservaService,private router: Router){
    
  }

  ngOnInit(): void {
    
  }

}
