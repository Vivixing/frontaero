import { Reserva } from "./reserva";

export interface Factura {
    factId ?: number;
    reseId : number;
    fecha : string;
    estado : string;
}

export interface FacturaModelo {
    factId ?: number;
    reseId : Reserva;
    fecha : string;
    estado : string;
}