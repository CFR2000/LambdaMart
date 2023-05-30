import { gql } from "graphql-request";

export const typeDef = gql`
  # Query the broker for information about vendors and products
  type Query {
    # Get a list of vendors, optionally filtered by vendorId, returning all vendors if no filters are provided
    vendors(vendorIds: [ID!]): [Vendor!]
    # Get a single product, filtered by classId, returning null if no product is found
    product(classId: ID!): Product
    # Get a list of products, optionally filtered by productType, coarseClassName, and classId, returning all products if no filters are provided
    products(
      coarseClassNames: [String!]
      productTypes: [String!]
      classIds: [ID!]
    ): [Product!]
    stock(vendorId: ID!): [Stock!]
    # Get a list of items, optionally filtered by vendorId and itemId
    item(vendorIds: [ID!], itemId: ID!): [InventoryItem!]
  }
`;
