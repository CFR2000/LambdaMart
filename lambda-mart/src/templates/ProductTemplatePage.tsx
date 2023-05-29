import React from "react";
import { Box, Heading, useColorModeValue, useToast } from "@chakra-ui/react";
import VendorList from "../components/product/vendors/VendorList";
import ProductBreadcrumbs from "../components/product/details/ProductBreadcrumbs";
import Hero from "../components/product/details/Hero";
import Layout from "../layouts/page-layout";
import { PageProps, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

const ProductTemplatePage: React.FC<PageProps<Queries.ProductPageQuery>> = ({
  data,
}) => {
  const toast = useToast();
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.300");
  const img = getImage(data.imageSharp!.gatsbyImageData);

  const {
    className,
    coarseClassName,
    country,
    key,
    description,
    productType,
    volume,
  } = data.broker.product!;

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
            product={productType!}
            category={coarseClassName!}
            title={className}
          />
        </Box>
        <Box>
          <Hero
            title={className}
            description={description!}
            image={img!}
            onBuyNowClick={() =>
              toast({
                title: "Click!",
                description: `You bought some ${className}`,
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
          <VendorList stockLevels={[...data.broker.item!]} />
        </Box>
      </Box>
    </Layout>
  );
};

export default ProductTemplatePage;

export const query = graphql`
  query ProductPage($classId: ID!, $originalName: String!) {
    imageSharp(fixed: { originalName: { eq: $originalName } }) {
      gatsbyImageData(width: 400)
    }
    broker {
      product(classId: $classId) {
        className
        coarseClassName
        country
        key
        description
        productType
        volume
      }
      item(itemId: $classId) {
        id
        vendorId
        price
        stockLevel
      }
    }
  }
`;
