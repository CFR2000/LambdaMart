import { QueryItemArgs } from "../types/generated_types";
import { Context } from "../types/types";
import { getFilter } from "./utils.js";

/**
 * `vendor` is a resolver function that returns a vendor
 * @param _ Parent, ignored
 * @param __ Arguments, ignored
 * @param context The context object, containing the database connection
 * @returns Vendor
 */
async function vendor(_, __, { db }: Context) {
  const items = await db.collection("Item").find({}).toArray(); // filter by vendorId if provided;
  return {
    title: "Lambda Market",
    description: "We sell everything in town!",
    icon: "http://localhost:8085/static/Lambda-market.png",
    inventory: items.map(({ classId, stockLevel, price }) => ({
      id: classId,
      stockLevel,
      price,
    })),
  };
}

async function item(_, args: QueryItemArgs, { db }: Context) {
  const items = getFilter("classId", args.id);
  const item = await db.collection("Item").findOne({ ...items }); // filter by vendorId if provided;
  return {
    id: item.classId,
    stockLevel: item.stockLevel,
    price: item.price,
  };
}

export default { vendor, item };
