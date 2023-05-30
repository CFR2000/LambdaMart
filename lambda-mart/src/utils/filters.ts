import React, { ChangeEvent } from "react";

export type OptionType = {
  value: string;
  label: string;
};

export type FilterTypeProps = {
  type: "select";
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: React.ReactEventHandler<HTMLElement>;
};

export type FilterType = FilterTypeProps & {
  id: string;
};

export type CheckboxTypeProps = {
  type: "checkbox";
  label: string;
  value: (string | number)[];
  options: { value: string | number; label: string }[];
  onChange: React.ReactEventHandler<HTMLElement>;
};

export type CheckboxType = CheckboxTypeProps & {
  id: string;
};

type FilterProps = [
  value: string | string[],
  setValue: (x: string) => void,
  options: string[]
];

const toOption: (x: string) => OptionType = (x) => ({
  value: x,
  label: x,
});

export const coarseClassFilter: (...args: FilterProps) => FilterType = (
  value,
  setValue,
  options
) => ({
  type: "select",
  id: "variety",
  options: options.map(toOption),
  label: "Variety",
  value: value[0] || "",
  onChange: (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target ? event.target.value : "");
  },
});

export const productTypeFilter: (...args: FilterProps) => CheckboxType = (
  typeFilter,
  setTypeFilter,
  productTypes
) => ({
  type: "checkbox",
  id: "category",
  label: "Category",
  value: typeFilter.split("|") || "",
  options: productTypes.map(toOption),
  onChange: (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target) {
      setTypeFilter("");
    } else {
      if (event.target.checked) {
        setTypeFilter(typeFilter + "|" + event.target.value);
      } else {
        setTypeFilter(
          typeFilter
            .split("|")
            .filter((v) => v != event.target.value)
            .join("|")
        );
      }
    }
  },
});
