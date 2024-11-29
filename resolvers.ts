import { Collection, ObjectId } from "mongodb";
import { Vuelo, VueloModel } from "./types.ts";
import { fromModelToVuelo } from "./utils.ts";


export const resolvers = {
  Query: {
    getFlights: async ( 
      _: unknown, 
      args: {origen?: string, destino?: string},
      context: { VuelosCollection: Collection<VueloModel> }, 
    ): Promise<Vuelo[]> => {
        const query: Partial<VueloModel> = {};
        if(args.origen) query.origen = args.origen;
        if(args.destino) query.destino = args.destino;

      const vuelosModel = await context.VuelosCollection.find().toArray(); 
      return vuelosModel.map((VueloModel) =>
        fromModelToVuelo(VueloModel)
      );
    },
    getFlight: async (
      _: unknown,
      { id }: { id: string },
      context: {
        VuelosCollection: Collection<VueloModel>;
      },
    ): Promise<Vuelo | null> => {
      const vueloModel = await context.VuelosCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!vueloModel) {
        return null;
      }
      return fromModelToVuelo(vueloModel);
    },
  },
  Mutation: {
    addFlight: async (
      _: unknown,
      args: { origen: string; destino: string, fecha: string },
      context: {
        VuelosCollection: Collection<VueloModel>;
      },
    ): Promise<Vuelo> => {
      const { origen, destino, fecha } = args; 
      const { insertedId } = await context.VuelosCollection.insertOne({
        origen,
        destino,
        fecha,
      });
      const vueloModel = {
        _id: insertedId,
        origen,
        destino,
        fecha,
      };
      return fromModelToVuelo(vueloModel!);
    },
  },
};