import request, { gql } from "graphql-request";

import type {
  MutationPurchaseArgs,
  MutationRegisterVendorArgs,
} from "../types/generated_types";
import { Context } from "../types/types";
import { getItem } from "./utils.js";

const purchaseMutation = gql`
  mutation Purchase($itemId: ID!, $quantity: Int!) {
    purchase(itemId: $itemId, quantity: $quantity)
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
    console.log("Vendor not found");
    return "VENDOR_NOT_FOUND";
  }

  const item = await getItem(vendor.url, itemId);
  if (!item) {
    console.log("Item not found");
    return "ITEM_NOT_FOUND";
  }

  if (quantity > item.stockLevel) {
    console.log("Insufficient stock");
    return "INSUFFICIENT_STOCK";
  }

  return await request(vendor.url, purchaseMutation, { id: itemId, quantity });
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

  console.log(`Register vendor result: ${result}`);

  if (result) {
    console.log("Vendor already exists");
    return false;
  }

  const { vendorId, url, title, description, icon } = args;

  db.collection("Vendor").insertOne({
    vendorId,
    url,
    title,
    description,
    icon,
  });
  return true;
}

export default { purchase, registerVendor };
