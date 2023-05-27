import React from "react";
import { Box, Heading, useColorModeValue, useToast } from "@chakra-ui/react";
import VendorList from "../components/product/vendors/VendorList";
import ProductBreadcrumbs from "../components/product/details/ProductBreadcrumbs";
import Hero from "../components/product/details/Hero";
import Layout from "../layouts/page-layout";
import { PageProps } from "gatsby";

const ProductTemplatePage: React.FC<PageProps<Queries.Broker_Product>> = (
  data
) => {
  const toast = useToast();
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.300");
  const { key, id } = data.pageContext;

  console.log(data);

  return (
    <Layout>
      <Box
        maxW="1200px"
        marginInline="auto"
        paddingInline={{ base: "4", md: "8" }}
        paddingBlock="8"
      >
        <Box pb="16">
          <ProductBreadcrumbs
            product={"temp"}
            category={"temp"}
            title={"temp"}
          />
        </Box>
        <Box>
          <Hero
            title={"temp"}
            description={"temp"}
            image={null}
            onBuyNowClick={() =>
              toast({
                title: "Click!",
                description: `You bought some ${key}`,
              })
            }
          />
        </Box>
        <Box
          marginBlock="8"
          border="1px"
          borderColor={borderColor}
          borderRadius="sm"
        >
          <VendorList data={[]} />
        </Box>
      </Box>
    </Layout>
  );
};

export default ProductTemplatePage;
