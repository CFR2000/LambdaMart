import request, { gql } from "graphql-request";

export const brokerUrl = process.env.GATSBY_BROKER_URL
  ? process.env.GATSBY_BROKER_URL
  : "http://localhost:4000";

const purchaseMutation = gql`
  mutation Mutation($vendorId: ID!, $itemId: ID!, $quantity: Int!) {
    purchase(vendorId: $vendorId, itemId: $itemId, quantity: $quantity)
  }
`;

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

export const purchaseItem = async (
  vendorId: string,
  itemId: string,
  quantity: number
) => {
  return await request(brokerUrl, purchaseMutation, {
    itemId,
    quantity,
    vendorId,
  });
};

export const getStock = async (itemId: string) => {
  return request<{ item: Queries.Broker_InventoryItem[] }>(
    brokerUrl,
    itemRefreshQuery,
    {
      itemId,
    }
  );
};

export const getVendors = async (vendorIds?: string[]) => {
  return request<{ vendors: Queries.Broker_Vendor[] }>(
    brokerUrl,
    vendorsQuery,
    { vendorIds }
  );
};
