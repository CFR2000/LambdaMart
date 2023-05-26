import React from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { FilterTypeProps } from "./FilterGroup";

const SelectOption = ({ options, label, value, onChange }: FilterTypeProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select
        placeholder={`Select ${label}`}
        variant="filled"
        onChange={onChange}
        value={value}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectOption;
