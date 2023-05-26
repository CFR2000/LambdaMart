import React from "react";
import { Box, Heading, useColorModeValue, useToast } from "@chakra-ui/react";
import VendorList from "../components/product/vendors/VendorList";
import ProductBreadcrumbs from "../components/product/details/ProductBreadcrumbs";
import Hero from "../components/product/details/Hero";
import Layout from "../layouts/page-layout";

const ProductTemplatePage: React.FC = (data: any) => {
    const toast = useToast();
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.300");

    const {
        className,
        coarseClassName,
        productType,
        country,
        description,
        id,
        image,
    } = data.pageContext;
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
                        product={productType}
                        category={coarseClassName}
                        title={className}
                    />
                </Box>
                <Box>
                    <Hero
                        title={className}
                        description={description}
                        image={image}
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
                    <VendorList data={[]} />
                </Box>
            </Box>
        </Layout>
    );
};

export default ProductTemplatePage;
