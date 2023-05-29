import type { MutationRegisterVendorArgs } from "../types/generated_types";
import { Context } from "../types/types";

/**
 * `purchase` is a resolver function that returns a single item
 */
const purchase = async () => {};

/**
 * `registerVendor` is a resolver function that registers a new vendor
 * @param _ Parent, ignored
 * @param args The arguments passed to the query
 * @param context The context object, containing the database connection
 * @returns Boolean, true if registered successfully, false otherwise
 */
const registerVendor = async (
  _,
  args: MutationRegisterVendorArgs,
  { db }: Context
) => {
  const result = await db
    .collection("vendors")
    .findOne({ url: { $eq: args.url } });

  console.log(result);

  if (result) {
    console.log("Vendor already exists");
    return false;
  }
  db.collection("vendors").insertOne(args);
  return true;
};

export default { purchase, registerVendor };
