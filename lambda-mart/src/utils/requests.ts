import request, { gql } from "graphql-request";

const purchaseQuery = gql`
  mutation Mutation($vendorId: ID!, $itemId: ID!, $quantity: Int!) {
    purchase(vendorId: $vendorId, itemId: $itemId, quantity: $quantity)
  }
`;

const itemRefreshQuery = gql`
  query ItemRefresh($itemId: ID!) {
    item(itemId: $itemId) {
      price
      id
      stockLevel
      vendorId
    }
  }
`;

export const purchaseItem = async (
  vendorId: string,
  itemId: string,
  quantity: number
) => {
  const brokerUrl = process.env.GATSBY_BROKER_URL || "http://localhost:4000";
  return await request(brokerUrl, purchaseQuery, {
    itemId,
    quantity,
    vendorId,
  });
};

export const getItem = async (itemId: string) => {
  const brokerUrl = process.env.GATSBY_BROKER_URL || "http://localhost:4000";

  return request<{ item: Queries.Broker_InventoryItem[] }>(
    brokerUrl,
    itemRefreshQuery,
    {
      itemId,
    }
  );
};
