import { gql } from "@apollo/client";

/**
 * `purchaseMutation` is a query that returns a single item, takes a vendorId, itemId, and quantity as arguments
 */
export const purchaseMutation = gql`
  mutation Mutation($vendorId: ID!, $itemId: ID!, $quantity: Int!) {
    purchase(vendorId: $vendorId, itemId: $itemId, quantity: $quantity)
  }
`;
