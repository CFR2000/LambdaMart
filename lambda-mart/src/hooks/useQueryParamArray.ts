import { useQueryParamString } from "react-use-query-param-string";

export const useQueryParamArray = (
  key: string,
  dflt: string | string[],
  delim: string = ","
) => {
  const [value, setValue] = useQueryParamString(
    key,
    Array.isArray(dflt) ? dflt.join(delim) : dflt
  );

  const setArray = (newValue: string | string[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue.join(delim));
    } else {
      setValue(newValue);
    }
  };

  return [value.split(delim), setArray] as const;
};
