import React, { useEffect } from "react";
import { Box, Heading, useColorModeValue, useToast } from "@chakra-ui/react";
import VendorList from "../components/product/vendors/VendorList";
import ProductBreadcrumbs from "../components/product/details/ProductBreadcrumbs";
import Hero from "../components/product/details/Hero";
import Layout from "../layouts/page-layout";
import { PageProps, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import { getItem, purchaseItem } from "../utils/requests";
import { itemRefreshQuery } from "../utils/queries";
import { useQuery } from "@apollo/client";

const ProductTemplatePage: React.FC<PageProps<Queries.ProductPageQuery>> = ({
  data,
}) => {
  const [inventory, setInventory] = React.useState<
    Queries.Broker_InventoryItem[]
  >([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [quantity, setQuantity] = React.useState<number>(1);

  const toast = useToast();
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.300");
  const img = getImage(data.imageSharp!.gatsbyImageData);

  const { classId, className, coarseClassName, description, productType } =
    data.broker.product!;

  const updateInventory = () => {
    setLoading(true);

    getItem(classId)
      .then((result) => {
        setInventory(result.item);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: `Failed to fetch stock levels for ${className}`,
          status: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    updateInventory();
  }, [classId]);

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
          <VendorList
            itemId={classId}
            stockLevels={loading || !inventory ? [] : inventory}
            quantity={quantity}
            setQuantity={(_, qty) => setQuantity(qty)}
            purchaseItem={(vendor) => {
              return async (e) => {
                e.preventDefault();
                const result = await purchaseItem(
                  vendor.vendorId,
                  classId,
                  quantity
                );
                updateInventory();
                console.log(result);
                if (result.purchase === "SUCCESS") {
                  toast({
                    title: "Purchased item",
                    description: "Enjoy!",
                    status: "success",
                  });
                } else {
                  toast({
                    title: "Error",
                    description: "Something went wrong.",
                    status: "error",
                  });
                }
              };
            }}
          />
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
        classId
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
