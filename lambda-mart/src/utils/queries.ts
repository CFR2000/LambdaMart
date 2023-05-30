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

export const itemsStockQuery = gql`
  query ItemsStock($itemId: ID!) {
    item(itemId: $itemId) {
      id
      itemId
      price
      stockLevel
      timeToDeliver
      vendor {
        description
        icon
        title
        vendorId
      }
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
