import { gql } from "graphql-request";

export const typeDef = gql`
  # Purchase an item from a vendor
  type Mutation {
    purchase(id: ID!, quantity: Int!): PurchaseResult!
  }

  # Represents the result of a purchase attempt
  enum PurchaseResult {
    SUCCESS
    INSUFFICIENT_STOCK
    ITEM_NOT_FOUND
  }
`;
