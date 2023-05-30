import { gql } from "@apollo/client";

/**
 * `itemRefreshQuery` is a query that returns a single item, takes an itemId as an argument
 */
export const itemRefreshQuery = gql`
  query ItemRefresh($itemId: ID!) {
    item(itemId: $itemId) {
      price
      id
      stockLevel
      vendorId
    }
  }
`;

export const vendorsQuery = gql`
  query Vendors($vendorIds: [ID!]) {
    vendors(vendorIds: $vendorIds) {
      vendorId
      url
      title
      description
      icon
      inventory {
        stockLevel
        price
      }
    }
  }
`;
