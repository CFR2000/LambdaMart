import request, { gql } from "graphql-request";

import type { InventoryItem, Stock, Vendor } from "../types/generated_types";

/** GraphQL Queries **/
const getInventoryQuery = gql`
  query GetInventory {
    vendor {
      inventory {
        id
        price
        stockLevel
      }
    }
  }
`;

const getStockQuery = gql`
  query getStock($itemId: ID!) {
    item(id: $itemId) {
      id
      price
      stockLevel
    }
  }
`;

export async function getInventory(url: string) {
  const data = await request<{
    vendor: Vendor & { inventory: Stock[] };
  }>(url, getInventoryQuery);

  return (data && data.vendor && data.vendor.inventory) || [];
}

async function _getStock(
  url: string,
  itemId: string | number
): Promise<InventoryItem | null> {
  try {
    const data = await request<{ item: InventoryItem }>(url, getStockQuery, {
      itemId,
    });
    return data && data.item ? data.item : null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

const timeout = async (time: number = 500) => {
  await new Promise((res) => setTimeout(res, time));
  return null;
};

export async function getStock(
  url: string,
  itemId: string | number
): Promise<InventoryItem | null> {
  return Promise.race([_getStock(url, itemId), timeout(200)]);
}

/** Helper functions **/
export const asList = (arr: any | any[]) =>
  (Array.isArray(arr) ? arr : [arr]).filter(
    (x) => Boolean(x) && x !== "null" && x !== "undefined"
  );

/**
 * `getFilter` returns a filter object that can be used in a MongoDB query
 * @param key The key to filter on
 * @param values The values to filter on, if any
 * @returns An object that can be used as a filter in a MongoDB query
 */
export const getFilter = (key: string, values?: (string | number)[]) => {
  values = asList(values);
  return values && values.length > 0 ? { [key]: { $in: values } } : {};
};
