import { gql } from "graphql-request";

export const typeDef = gql`
  # Purchase an item from a vendor
  type Mutation {
    # Register a new vendor, returns true if successful
    registerVendor(
      vendorId: ID!
      url: String!
      title: String!
      description: String!
      icon: String!
    ): Boolean
    purchase(vendorId: ID!, itemId: ID!, quantity: Int!): PurchaseResult!
  }

  # Represents the result of a purchase attempt
  enum PurchaseResult {
    SUCCESS
    INSUFFICIENT_STOCK
    ITEM_NOT_FOUND
  }
`;
