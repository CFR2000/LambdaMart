import { gql } from "graphql-request";

export const typeDef = gql`
  # Represents an item within a vendor's inventory
  type InventoryItem {
    vendorId: ID!
    id: ID!
    stockLevel: Int!
    price: Float!
  }

  # Represents a vendor that sells products through the broker
  type Vendor {
    vendorId: ID!
    url: String!
    title: String!
    description: String!
    icon: String!
    inventory: [InventoryItem!]!
  }
`;
