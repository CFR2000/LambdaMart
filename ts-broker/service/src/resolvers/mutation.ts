import request, { gql } from "graphql-request";

import {
  MutationPurchaseArgs,
  MutationRegisterVendorArgs,
  PurchaseResult,
} from "../types/generated_types";
import { Context } from "../types/types";
import { getStock } from "./utils.js";

const purchaseMutation = gql`
  mutation Purchase($itemId: ID!, $quantity: Int!) {
    purchase(id: $itemId, quantity: $quantity)
  }
`;

/**
 * `purchase` is a resolver function that returns a single item
 */
async function purchase(_, args: MutationPurchaseArgs, { db }: Context) {
  const { vendorId, itemId, quantity } = args;
  // get vendor
  const vendor = await db
    .collection("Vendor")
    .findOne({ vendorId: { $eq: vendorId } });

  if (!vendor) {
    return "VENDOR_NOT_FOUND";
  }

  const item = await getStock(vendor.url, itemId);
  if (!item) {
    return "ITEM_NOT_FOUND";
  }

  if (quantity > item.stockLevel) {
    return "INSUFFICIENT_STOCK";
  }

  const result = await request<{ purchase: PurchaseResult }>(
    vendor.url,
    purchaseMutation,
    {
      itemId,
      quantity: quantity * 1,
    }
  );
  return result.purchase;
}

/**
 * `registerVendor` is a resolver function that registers a new vendor
 * @param _ Parent, ignored
 * @param args The arguments passed to the query
 * @param context The context object, containing the database connection
 * @returns Boolean, true if registered successfully, false otherwise
 */
async function registerVendor(
  _,
  args: MutationRegisterVendorArgs,
  { db }: Context
) {
  console.log(`Register vendor args: ${JSON.stringify(args)}`);
  const result = await db
    .collection("Vendor")
    .findOne({ url: { $eq: args.url } });

  if (result) {
    return false;
  }

  const { vendorId, url, title, description, icon } = args;

  db.collection("Vendor").insertOne({
    vendorId,
    url,
    title,
    description,
    // random number of milliseconds between 0 and 1 month
    timeToDeliver: Math.round(2.628e9 * Math.random()),
    icon,
  });
  return true;
}

export default { purchase, registerVendor };
