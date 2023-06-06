import { Aeropuerto } from "./aeropuerto";
import { Asiento } from "./asiento";
import { Avion } from "./avion";
import { Trayecto } from "./trayecto";
import { Vuelo } from "./vuelo";

export interface Reserva {
    reseId ?: number;
    vuelId : number;
    asieId : number;
    usuaId : number;
    precioTotal : number;
    estadoPago : string;
    fecha : string;
    estado : string;
}

export interface ReservaModelo {
    reservaDatos: Reserva;
    vueloDatos : Vuelo;
    escalasDatos : Trayecto[];
    avionesDatos : Avion[];
    aeropuertosDatos : Aeropuerto[],
    asientoDatos : Asiento
    
}
