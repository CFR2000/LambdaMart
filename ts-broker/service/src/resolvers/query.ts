import {
  QueryProductArgs,
  QueryProductsArgs,
  QueryItemArgs,
} from "../types/generated_types";
import { Context } from "../types/types";
import { getFilter, asList, getInventory, getItem } from "./utils.js";

/**
 * `product` is a resolver function that returns a single product
 * @param _ Parent, ignored
 * @param args The arguments passed to the query
 * @param context The context object, containing the database connection
 * @returns Product
 */
async function product(_, args: QueryProductArgs, { db }: Context) {
  const products = db.collection("Product");
  return await products.findOne({ classId: { $eq: args.classId } });
}

/**
 * `products` is a resolver function that returns a list of products
 * @param _ Parent, ignored
 * @param args The arguments passed to the query
 * @param context The context object, containing the database connection
 * @returns Product[]
 */
async function products(_, args: QueryProductsArgs, { db }: Context) {
  const products = db.collection("Product");

  const productType = getFilter("productType", asList(args.productTypes));
  const coarseClassName = getFilter(
    "coarseClassName",
    asList(args.coarseClassNames)
  );
  const id = getFilter("classId", asList(args.classIds));

  return await products
    .find({ ...productType, ...coarseClassName, ...id })
    .toArray();
}

/**
 * `vendors` is a resolver function that returns a list of vendors
 * @param _ Parent, ignored
 * @param __ Arguments, ignored
 * @param context The context object, containing the database connection
 * @returns Vendor[]
 */
async function vendors(_, __, { db }: Context) {
  const vendors = await db.collection("Vendor").find({}).toArray();

  return await Promise.all(
    (vendors || []).map(async (vendor) => ({
      inventory: await getInventory(vendor.url),
      ...vendor,
    }))
  );
}

/**
 * `item` is a resolver function that returns a single item
 * @param _ Parent, ignored
 * @param args The arguments passed to the query
 * @param context The context object, containing the database connection
 * @returns InventoryItem
 */
async function item(_, args: QueryItemArgs, { db }: Context) {
  const { vendorId, itemId } = args;
  const vendor = await db
    .collection("Vendor")
    .findOne({ vendorId: { $eq: vendorId } });

  return getItem(vendor.url, itemId);
}

export default { product, products, vendors, item };
