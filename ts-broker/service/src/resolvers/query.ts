import {
  QueryProductArgs,
  QueryProductsArgs,
  QueryItemArgs,
  QueryVendorsArgs,
  QueryStockArgs,
} from "../types/generated_types";
import { Context } from "../types/types";
import { getFilter, getStock, getInventory } from "./utils.js";

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

  const productType = getFilter("productType", args.productTypes);
  const coarseClassName = getFilter("coarseClassName", args.coarseClassNames);
  const id = getFilter("classId", args.classIds);

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
async function vendors(_, args: QueryVendorsArgs, { db }: Context) {
  const vendorIds = getFilter("vendorId", args.vendorIds);

  return await db
    .collection("Vendor")
    .find({ ...vendorIds })
    .toArray();
}

async function stock(_, args: QueryStockArgs, { db }: Context) {
  const vendor = await db
    .collection("Vendor")
    .findOne({ vendorId: { $eq: args.vendorId } }); // filter by vendorId if provided;

  const items = await getInventory(vendor.url);

  // filter out `null`s and `undefined`s
  return items.filter((x) => Boolean(x.id && x.stockLevel && x.price));
}

/**
 * `item` is a resolver function that returns a single item
 * @param _ Parent, ignored
 * @param args The arguments passed to the query
 * @param context The context object, containing the database connection
 * @returns InventoryItem
 */
async function item(_, args: QueryItemArgs, { db }: Context) {
  const vendorId = getFilter("vendorId", args.vendorIds);
  const vendors = await db
    .collection("Vendor")
    .find({ ...vendorId }) // filter by vendorId if provided
    .toArray();

  console.log(vendors);

  const items = await Promise.all(
    vendors.map(async ({ timeToDeliver, ...vendor }) => {
      const item = await getStock(vendor.url, args.itemId);
      console.log("item", item);
      return item !== null
        ? {
            vendor,
            timeToDeliver,
            // id: args.itemId,
            ...item,
          }
        : null;
    })
  );

  console.log(items);

  // filter out `null`s and `undefined`s
  return items.filter((x) => !!x);
}

export default { product, products, stock, vendors, item };
