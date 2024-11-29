import { Vuelo, VueloModel } from "./types.ts";

export const fromModelToVuelo = (vuelosModel: VueloModel): Vuelo => {
  return {
    id: vuelosModel._id!.toString(), 
    origen: vuelosModel.origen,
    destino: vuelosModel.destino,
    fecha: vuelosModel.fecha,
  };
};