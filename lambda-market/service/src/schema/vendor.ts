import { gql } from "graphql-request";

export const typeDef = gql`
  # Represents a vendor that sells products through the broker
  type Vendor {
    title: String!
    description: String!
    icon: String!
    inventory: [InventoryItem!]!
  }

  # Represents a vendors inventory of a single item
  type InventoryItem {
    id: ID!
    stockLevel: Int!
    price: Float!
  }
`;
