import { gql } from "graphql-request";

export const typeDef = gql`
  # Query the broker for information about vendors and products
  type Query {
    vendors(vendorIds: [ID!]): [Vendor!]!
    product(classId: ID!): Product
    products(
      coarseClassNames: [String!]
      productTypes: [String!]
      classIds: [ID!]
    ): [Product!]!
    item(vendorIds: [ID!], itemId: ID!): [InventoryItem!]
  }
`;
