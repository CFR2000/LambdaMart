import { gql } from "graphql-request";

export const typeDef = gql`
  # Query the broker for information about vendors and products
  type Query {
    vendors: [Vendor!]!
    product(classId: ID!): Product
    products(
      coarseClassNames: [String!]
      productTypes: [String!]
      classIds: [ID!]
    ): [Product!]!
    item(vendorId: ID!, itemId: ID!): InventoryItem
  }
`;
