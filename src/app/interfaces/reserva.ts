import { Asiento } from "./asiento";
import { Usuario } from "./usuario";
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
    reseId ?: number;
    vuelId : Vuelo;
    asieId : Asiento;
    usuaId : Usuario;
    precioTotal : number;
    estadoPago : string;
    fecha : string;
    estado : string;
}
