import { gql } from "graphql-request";

export const typeDef = gql`
  # Query the lambda-market API
  type Query {
    # Get vendor information
    vendor: Vendor
    # Get an item, optionally filtered by vendorId and itemId
    item(id: ID!): InventoryItem
  }
`;
