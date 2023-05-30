import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

const ProductGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <SimpleGrid
      minH="75vh"
      minW={{ base: 0, md: "100%" }}
      columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
      spacing={{ base: 4, md: 12 }}
    >
      {children}
    </SimpleGrid>
  );
};

export default ProductGrid;
