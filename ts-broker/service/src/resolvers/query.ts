import request, { gql } from "graphql-request";

import {
  QueryProductArgs,
  QueryProductsArgs,
  Product,
  QueryItemArgs,
  VendorResolvers,
  InventoryItemResolvers,
} from "../types/generated_types";
import { Context } from "../types/types";

const asList = (arr: any | any[]) =>
  (Array.isArray(arr) ? arr : [arr]).filter(
    (x) => Boolean(x) && x !== "null" && x !== "undefined"
  );

const getFilter = (key: keyof Product, values?: (string | number)[]) =>
  values && values.length > 0 ? { [key]: { $in: values } } : {};

const getInventory = async (url: string) => {
  const query = gql`
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
  const data = await request<{ vendor: VendorResolvers }>(url, query);

  return (data && data.vendor && data.vendor.inventory) || [];
};

/**
 * `product` is a resolver function that returns a single product
 * @param _ Parent, ignored
 * @param args The arguments passed to the query
 * @param context The context object, containing the database connection
 * @returns Product
 */
const product = async (_, args: QueryProductArgs, { db }: Context) => {
  const products = db.collection("Product");
  return await products.findOne({ classId: { $eq: args.classId } });
};

/**
 * `products` is a resolver function that returns a list of products
 * @param _ Parent, ignored
 * @param args The arguments passed to the query
 * @param context The context object, containing the database connection
 * @returns Product[]
 */
const products = async (_, args: QueryProductsArgs, { db }: Context) => {
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
};

/**
 * `vendors` is a resolver function that returns a list of vendors
 * @param _ Parent, ignored
 * @param __ Arguments, ignored
 * @param context The context object, containing the database connection
 * @returns Vendor[]
 */
const vendors = async (_, __, { db }: Context) => {
  const vendors = await db.collection("vendors").find({}).toArray();

  return await Promise.all(
    (vendors || []).map(async (vendor) => ({
      inventory: await getInventory(vendor.url),
      ...vendor,
    }))
  );
};

/**
 * `item` is a resolver function that returns a single item
 * @param _ Parent, ignored
 * @param args The arguments passed to the query
 * @param context The context object, containing the database connection
 * @returns InventoryItem
 */
const item = async (_, args: QueryItemArgs, { db }: Context) => {
  const { vendorId, itemId } = args;
  const vendor = await db
    .collection("vendors")
    .findOne({ vendorId: { $eq: vendorId } });

  console.log(`vendor: ${JSON.stringify(vendor)}`);
  const query = gql`
  query {
    item(id: ${itemId}) {
      id
      price
      stockLevel
    }
  }`;

  return (await request<{ item: InventoryItemResolvers }>(vendor.url, query))
    .item;
};

export default { product, products, vendors, item };
