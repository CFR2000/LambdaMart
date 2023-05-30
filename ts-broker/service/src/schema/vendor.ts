import { gql } from "graphql-request";

export const typeDef = gql`
  # Represents a vendor that sells products through the broker
  type Vendor {
    vendorId: ID!
    url: String!
    title: String!
    description: String!
    icon: String!
  }

  # Represents a vendors inventory of a single item
  type Stock {
    id: ID!
    stockLevel: Int!
    price: Float!
  }

  # Represents an item within a vendor's inventory
  type InventoryItem {
    id: ID!
    vendor: Vendor!
    timeToDeliver: Int!
    itemId: ID!
    stockLevel: Int!
    price: Float!
  }
`;
