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
export const getFilter = (
  key: string,
  values?: string | number | (string | number)[]
) => {
  values = asList(values);
  return values && values.length > 0 ? { [key]: { $in: values } } : {};
};
