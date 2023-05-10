import { Avion } from "./avion";
import { TipoAsiento } from "./tipo-asiento";

export interface Asiento {
    asieId ?: number;
    tipoAsiento_tiasId : number;
    nombreTipoAsiento : string;
    ModeloAvion: string;
    avion_avioId: number;
    ubicacion: string;
    precio : number;
    estado: string;
}

export interface AsientoModelo {
    asieId ?: number;
    tipoAsiento_tiasId : TipoAsiento;
    nombreTipoAsiento : TipoAsiento;
    ModeloAvion: Avion;
    avion_avioId: Avion;
    ubicacion: string;
    precio : number;
    estado: string;
}