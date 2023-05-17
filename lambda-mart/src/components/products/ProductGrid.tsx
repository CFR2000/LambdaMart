import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

const ProductGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <SimpleGrid minChildWidth="300px" spacing="40px">
      {children}
    </SimpleGrid>
  );
};

export default ProductGrid;
