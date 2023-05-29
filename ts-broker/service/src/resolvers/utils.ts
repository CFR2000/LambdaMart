import request, { gql } from "graphql-request";

import type { InventoryItem, Product, Vendor } from "../types/generated_types";

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

const getItemQuery = gql`
  query GetItem($itemId: ID!) {
    item(id: $itemId) {
      id
      price
      stockLevel
    }
  }
`;

export const asList = (arr: any | any[]) =>
  (Array.isArray(arr) ? arr : [arr]).filter(
    (x) => Boolean(x) && x !== "null" && x !== "undefined"
  );

export const getFilter = (key: string, values?: (string | number)[]) =>
  values && values.length > 0 ? { [key]: { $in: values } } : {};

export async function getInventory(url: string) {
  const data = await request<{ vendor: Vendor }>(url, getInventoryQuery);

  return (data && data.vendor && data.vendor.inventory) || [];
}

export async function getItem(url: string, itemId: string | number) {
  try {
    const data = await request<{ item: InventoryItem }>(url, getItemQuery, {
      itemId,
    });
    return data && data.item ? data.item : null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
