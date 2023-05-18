import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

const ProductGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <SimpleGrid
      minH="75vh"
      columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
      spacing="40px"
    >
      {children}
    </SimpleGrid>
  );
};

export default ProductGrid;
