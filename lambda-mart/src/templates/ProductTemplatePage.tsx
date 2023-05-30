import React, { useEffect } from "react";
import { Box, Heading, useColorModeValue, useToast } from "@chakra-ui/react";
import { PageProps, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import Hero from "../components/product/details/Hero";
import VendorList from "../components/product/vendors/VendorList";
import ProductBreadcrumbs from "../components/product/details/ProductBreadcrumbs";
import Layout from "../layouts/page-layout";
import { itemRefreshQuery, itemsStockQuery } from "../utils/queries";
import { purchaseMutation } from "../utils/mutations";
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

  const { loading, error, data, refetch } = useQuery(itemsStockQuery, {
    variables: { itemId: classId },
    pollInterval: 5000,
  });

  console.log(data);

  if (error) {
    toast({
      title: "Error",
      description: `Something went wrong. (${error})`,
      status: "error",
    });
  }

  const [purchaseItem, { data: m_data, error: m_error }] = useMutation(
    purchaseMutation,
    {
      onCompleted: (data) =>
        toast({
          title: "Success",
          description: `You bought some ${className}`,
          isClosable: true,
          colorScheme: "primary",
        }),
    }
  );

  if (m_error) {
    toast({
      title: "Error",
      description: `Something went wrong while processing your purchase (${m_data}).`,
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
                description: `You clicked a button for ${className} (you didn't buy it though)`,
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
            stockLevels={loading || !data || !data.item ? [] : data.item}
            quantity={quantity}
            setQuantity={(_, qty) => setQuantity(qty)}
            purchaseItem={(vendor) => {
              purchaseItem({
                variables: {
                  vendorId: vendor.vendorId,
                  itemId: classId,
                  quantity: quantity,
                },
              });
              refetch();
            }}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default ProductTemplatePage;
