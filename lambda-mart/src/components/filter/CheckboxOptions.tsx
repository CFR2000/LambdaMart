import React from "react";

import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Stack,
} from "@chakra-ui/react";

import { CheckboxTypeProps, FilterTypeProps } from "./FilterGroup";

const CheckboxOptions = ({
  options,
  label,
  value,
  onChange,
}: CheckboxTypeProps) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <CheckboxGroup value={value}>
        <Stack>
          {options.map(({ value, label }) => (
            <Checkbox
              key={value}
              value={value}
              onChange={onChange}
              isChecked={value === "true"}
            >
              {label}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </FormControl>
  );
};

export default CheckboxOptions;
