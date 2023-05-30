import { MutationPurchaseArgs } from "../types/generated_types";
import { Context } from "../types/types";

/**
 * `purchase` is a resolver function that returns a single item
 */
async function purchase(_, args: MutationPurchaseArgs, { db }: Context) {
  const { id, quantity } = args;
  const item = await db.collection("Item").findOne({ classId: { $eq: id } });

  if (!item) {
    return "ITEM_NOT_FOUND";
  }

  if (quantity > item.stockLevel) {
    return "INSUFFICIENT_STOCK";
  }

  await db
    .collection("Item")
    .updateOne({ classId: { $eq: id } }, { $inc: { stockLevel: -quantity } });
  return "SUCCESS";
}

export default { purchase };
