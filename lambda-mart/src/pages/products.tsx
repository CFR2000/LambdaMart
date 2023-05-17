import React, { ChangeEvent } from "react";
import { useQueryParamString } from "react-use-query-param-string";

import { graphql } from "gatsby";
import Layout from "../layouts/page-layout";
import ProductGrid from "../components/products/ProductGrid";
import Pagination from "@choc-ui/paginator";
import ProductGridItem from "../components/products/ProductGridItem";
import { IGatsbyImageData } from "gatsby-plugin-image";
import FilterGroup, {
  FilterType,
  OptionType,
} from "../components/filter/FilterGroup";
import { Box, Stack, Text } from "@chakra-ui/react";

export const query = graphql`
  query ProductQuery {
    allDatasetJson {
      unique_coarse_class_name: distinct(field: { coarse_class_name: SELECT })
      unique_product_type: distinct(field: { product_type: SELECT })
      nodes {
        class_name
        coarse_class_name
        description
        country
        id
        image: image_path {
          childImageSharp {
            gatsbyImageData(
              width: 200
              placeholder: BLURRED
              formats: [PNG, WEBP, AUTO]
            )
          }
        }
        class_id
        product_type
      }
    }
  }
`;

type ProductItem = {
  class_name: string;
  description: string;
  coarse_class_name: string;
  country: string;
  id: string;
  image: IGatsbyImageData;
  class_id: number;
  product_type: string;
};

const toOption: (x: string) => OptionType = (x) => ({
  value: x,
  label: x,
});

const ProductPage: React.FC = ({ data }: any) => {
  const product_types = data.allDatasetJson.unique_product_type;
  const coarse_class_names = data.allDatasetJson.unique_coarse_class_name;

  const [varietyFilter, setVarietyFilter] = useQueryParamString("variety", "");

  const [categoryFilter, setCategoryFilter] = useQueryParamString(
    "category",
    ""
  );

  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);

  const filters: FilterType[] = [
    {
      id: "variety",
      options: coarse_class_names.map(toOption),
      type: "select",
      label: "Variety",
      value: varietyFilter || "",
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setVarietyFilter(event.target.value!);
      },
    },
    {
      id: "category",
      options: product_types.map(toOption),
      type: "select",
      label: "Category",
      value: categoryFilter || "",
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setCategoryFilter(event.target.value);
      },
    },
  ];

  const products = data.allDatasetJson.nodes.filter(
    (p: ProductItem) =>
      (!categoryFilter || p.product_type === categoryFilter) &&
      (!varietyFilter || p.coarse_class_name === varietyFilter)
  );
  return (
    <Layout>
      <Box maxW="100%" mx={{ base: "1", md: "16" }}>
        <Stack
          flexDir={"row"}
          justifyContent="space-between"
          mx={{ base: "1", md: "8" }}
          my="4"
        >
          <FilterGroup filters={filters} />
          <Text>There are {products.length} items</Text>
        </Stack>
        <ProductGrid>
          {products
            .slice(pageSize * page, pageSize * (page + 1))
            .map(
              (
                {
                  id,
                  image,
                  description,
                  class_name,
                  coarse_class_name,
                  product_type,
                }: ProductItem,
                i: number
              ) => (
                <ProductGridItem
                  key={id}
                  image={image}
                  price="€420.69"
                  rating={(i * i) % 6}
                  description={description.slice(0, 50) + "..."}
                  title={class_name}
                  product_type={product_type}
                  coarse_class_name={coarse_class_name}
                />
              )
            )}
        </ProductGrid>
        <Pagination
          defaultCurrent={2}
          total={products.length}
          paginationProps={{ display: "flex" }}
          colorScheme="primary"
          current={page}
          onChange={(p) => setPage(p!)}
          pageSize={pageSize}
        />
      </Box>
    </Layout>
  );
};

export default ProductPage;
