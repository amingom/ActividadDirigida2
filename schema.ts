export const schema = `#graphql
type Vuelo { 
  
  id: ID! 
  origen: String!
  destino: String!
  fecha: String!
}

type Query {
    getFlights(origen: String, destination: String): [Vuelo!]!
    getFlight(id: ID!): Vuelo
}

type Mutation {
    addFlight(origen: String!, destino: String!, fecha: String!): Vuelo!
}
`;