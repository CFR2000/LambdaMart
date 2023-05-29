// @ts-nocheck
import React, { SyntheticEvent, useRef, useState } from "react";
import {
  SimpleGrid,
  GridItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Button,
  DrawerCloseButton,
  DrawerHeader,
  useOutsideClick,
  ButtonGroup,
} from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";

import CheckboxOptions from "./CheckboxOptions";
import SelectOption from "./SelectOption";

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

const FilterGroup = ({
  filters,
}: {
  filters: (FilterType | CheckboxType)[];
}) => {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  useOutsideClick({
    ref: ref,
    handler: () => setIsOpen(false),
  });
  return (
    <>
      <ButtonGroup>
        <Button
          isDisabled={true}
          leftIcon={<BsFilter />}
          onClick={() => setIsOpen(true)}
        >
          Filter
        </Button>
        <Button
          variant="ghost"
          mr={3}
          colorScheme="primary"
          onClick={() =>
            filters.forEach((f) =>
              f.onChange({} as SyntheticEvent<HTMLInputElement>)
            )
          }
        >
          Clear filters
        </Button>
      </ButtonGroup>
      <Drawer isOpen={isOpen} onClose={() => {}}>
        <DrawerOverlay />

        <DrawerContent ref={ref}>
          <DrawerCloseButton onClick={() => setIsOpen(false)} />
          <DrawerHeader>Create your account</DrawerHeader>
          <DrawerBody>
            <SimpleGrid
              minChildWidth="200px"
              spacing="40px"
              maxW="2xl"
              my="6"
              mx={{ base: "1", md: "16" }}
            >
              {filters.map(({ id, ...filter }) => {
                switch (filter.type) {
                  case "select":
                    return (
                      <GridItem key={id}>
                        <SelectOption {...filter} />
                      </GridItem>
                    );
                  case "checkbox":
                    return (
                      <GridItem key={id}>
                        <CheckboxOptions {...filter} />
                      </GridItem>
                    );
                  default:
                    throw new Error(`Unknown filter type: ${filter.type}`);
                }
              })}
            </SimpleGrid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterGroup;
