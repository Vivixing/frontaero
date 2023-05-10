import { Aeropuerto } from "./aeropuerto";
import { Avion } from "./avion";
import { Vuelo } from "./vuelo";

export interface Trayecto {
    trayId ?: number;
    avioId: number;
    aereoIdOrigen: number;
    aereoIdDestino : number;
    horaSalida : string;
    horaLlegada : string;
    vuelId: number;
    estado: string;
}

export interface TrayectoModelo {
    trayId ?: number;
    avioId: Avion;
    aereoIdOrigen: Aeropuerto;
    aereoIdDestino : Aeropuerto;
    horaSalida : string;
    horaLlegada : string;
    vuelId: Vuelo;
    estado: string;
}
