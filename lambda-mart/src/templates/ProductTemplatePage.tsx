import React, { useEffect } from "react";
import { Box, Heading, useColorModeValue, useToast } from "@chakra-ui/react";
import { PageProps, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import Hero from "../components/product/details/Hero";
import VendorList from "../components/product/vendors/VendorList";
import ProductBreadcrumbs from "../components/product/details/ProductBreadcrumbs";
import Layout from "../layouts/page-layout";
import { getStock, purchaseItem } from "../utils/requests";
import { itemRefreshQuery } from "../utils/queries";
import { gql, useMutation, useQuery } from "@apollo/client";

type StockItem = { id: string | number; stockLevel: number; price: number };

const ProductTemplatePage: React.FC<PageProps<any, Queries.DataJson>> = ({
  pageContext: {
    classId,
    className,
    imagePath: image,
    coarseClassName,
    description,
    productType,
  },
}) => {
  const [quantity, setQuantity] = React.useState<number>(1);
  const toast = useToast();
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.300");
  const img = getImage(image!.childImageSharp!.gatsbyImageData);

  const { loading, error, data } = useQuery(itemRefreshQuery, {
    variables: { itemId: classId },
    pollInterval: 5000,
  });

  if (error) {
    toast({
      title: "Error",
      description: "Something went wrong.",
      status: "error",
    });
  }

  const [purchaseItem, { data: m_data, loading: m_loading, error: m_error }] =
    useMutation(gql`
      mutation Mutation($vendorId: ID!, $itemId: ID!, $quantity: Int!) {
        purchase(vendorId: $vendorId, itemId: $itemId, quantity: $quantity)
      }
    `);

  if (m_error) {
    toast({
      title: "Error",
      description: `Something went wrong while purchasing (${m_data}).`,
      status: "error",
    });
  }

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
            title={className!}
          />
        </Box>
        <Box>
          <Hero
            title={className!}
            description={description!}
            image={img!}
            onBuyNowClick={() =>
              toast({
                title: "Click!",
                description: `You bought some ${className}`,
                isClosable: true,
                colorScheme: "primary",
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
          <VendorList
            itemId={classId!}
            stockLevels={loading || !data || !data.item ? [] : data.item}
            quantity={quantity}
            setQuantity={(_, qty) => setQuantity(qty)}
            purchaseItem={(vendor) => {
              console.log(vendor, classId, quantity);
              purchaseItem({
                variables: {
                  vendorId: vendor.vendorId,
                  itemId: classId,
                  quantity: quantity,
                },
              });
            }}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default ProductTemplatePage;
