import { Aeropuerto } from "./aeropuerto";
import { Avion } from "./avion";


export interface Trayecto {
    trayId ?: number;
    avioId: number;
    aereoIdOrigen: number;
    aereoIdDestino : number;
    horaSalida : Date;
    horaLlegada : Date;
    vuelId: number;
    estado: string;
}

export interface TrayectoModelo {
    trayId ?: number;
    avioId: Avion;
    aereoIdOrigen: Aeropuerto;
    aereoIdDestino : Aeropuerto;
    horaSalida : Date;
    horaLlegada : Date;
    vuelId: number;
    estado: string;
}
