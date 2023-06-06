import { Aeropuerto } from "./aeropuerto";

export interface Vuelo {
    vueloId ?: number;
    aeropuerto_aeroIdOrigen: number;
    aeropuerto_aeroIdDestino: number;
    nombreAeroOrigen: string;
    nombreAeroDestino: string;
    precio: number;
    hora_salida : Date;
    hora_llegada: Date;
    precioAsientoVip : number;
    precioAsientoNormal : number;
    precioAsientoBasico :number;
    estado : string;
}

export interface VueloModelo {
    vueloId ?: number ;
    aeropuerto_aeroIdOrigen: Aeropuerto;
    aeropuerto_aeroIdDestino: Aeropuerto;
    nombreAeroOrigen: string;
    nombreAeroDestino: string;
    precio: number;
    hora_salida : Date;
    hora_llegada: Date;
    precioAsientoVip : number;
    precioAsientoNormal : number;
    precioAsientoBasico :number;
    estado : string;
}