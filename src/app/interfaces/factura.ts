import { Reserva } from "./reserva";

export interface Factura {
    factId ?: number;
    reseId : number;
    fecha : Date;
    estado : string;
}

export interface FacturaModelo {
    factId ?: number;
    reseId : Reserva;
    fecha : Date;
    estado : string;
}