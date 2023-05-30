import React from "react";
import { useQueryParamString } from "react-use-query-param-string";

import { PageProps, graphql } from "gatsby";
import Layout from "../layouts/page-layout";
import ProductGrid from "../components/products/ProductGrid";
import Pagination from "@choc-ui/paginator";
import ProductGridItem from "../components/products/ProductGridItem";
import FilterGroup, {
  CheckboxType,
  FilterType,
} from "../components/filter/FilterGroup";
import { coarseClassFilter, productTypeFilter } from "../utils/filters";
import { Box, HStack, Stack, Text, useBreakpointValue } from "@chakra-ui/react";

export const query = graphql`
  query ProductsPage {
    allDataJson {
      nodes {
        className
        coarseClassName
        productType
        description
        key
        image: imagePath {
          childImageSharp {
            gatsbyImageData(
              width: 125
              height: 125
              quality: 100
              placeholder: BLURRED
              formats: [PNG, WEBP, AUTO]
              transformOptions: { cropFocus: ATTENTION }
            )
          }
        }
      }
    }
  }
`;

const ProductPage: React.FC<PageProps<Queries.ProductsPageQuery>> = ({
  data,
}) => {
  const pageSize = useBreakpointValue({ base: 10, lg: 12, "2xl": 16 });
  const [page, setPage] = React.useState<number>(1);
  const [coarseFilter, setCoarseFilter] = useQueryParamString("variety", "");
  const [typeFilter, setTypeFilter] = useQueryParamString("category", "");

  const allProducts = data.allDataJson.nodes;
  const products = allProducts
    .filter(
      (v) => typeFilter.length === 0 || typeFilter.includes(v.productType!)
    )
    .filter(
      (v) =>
        coarseFilter.length === 0 || coarseFilter.includes(v.coarseClassName!)
    );

  const productTypes = [
    ...new Set(allProducts.map((p) => p.productType)),
  ] as string[];

  const coarseClassNames = [
    ...new Set(
      allProducts
        .filter(
          (p) => typeFilter.length === 0 || typeFilter.includes(p.productType!)
        )
        .map((p) => p.coarseClassName)
    ),
  ] as string[];

  if (coarseFilter && !coarseClassNames.includes(coarseFilter!)) {
    setCoarseFilter("");
  }

  const filters: (FilterType | CheckboxType)[] = [
    coarseClassFilter(coarseFilter, setCoarseFilter, coarseClassNames),
    productTypeFilter(typeFilter, setTypeFilter, productTypes),
  ];

  const from = pageSize! * (page - 1);
  const to = pageSize! * page;

  if (from >= products.length) {
    setPage(Math.ceil(products.length / pageSize!));
  }

  return (
    <Layout>
      <Box mx="auto" maxW="9xl" px={{ base: "1", sm: "16" }}>
        <Stack
          flexDir={{ base: "column", sm: "row" }}
          justifyContent="space-between"
          mx={{ base: "1", md: "8" }}
          my="4"
        >
          <FilterGroup filters={filters} />
          <Text>There are {products.length} item(s)</Text>
        </Stack>
        <ProductGrid>
          {products
            .slice(from, to)
            .map(
              (
                {
                  key,
                  description,
                  className,
                  image,
                  coarseClassName,
                  productType,
                },
                i: number
              ) => (
                <ProductGridItem
                  key={key}
                  path={key!}
                  image={image!}
                  price="€420.69"
                  rating={(i * i) % 6}
                  description={description ? description.split(".")[0] : ""}
                  title={className!}
                  productType={productType!}
                  coarseClassName={coarseClassName!}
                />
              )
            )}
        </ProductGrid>
        <HStack justifyContent={"center"} my="8">
          <Pagination
            key={pageSize}
            total={products.length}
            paginationProps={{ display: "flex" }}
            colorScheme="primary"
            current={page}
            onChange={(p) => setPage(p!)}
            pageSize={pageSize}
          />
        </HStack>
      </Box>
    </Layout>
  );
};

export default ProductPage;
