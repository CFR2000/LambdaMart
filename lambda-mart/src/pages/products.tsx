import React, { ChangeEvent } from "react";
import { useQueryParamString } from "react-use-query-param-string";

import { graphql } from "gatsby";
import Layout from "../layouts/page-layout";
import ProductGrid from "../components/products/ProductGrid";
import Pagination from "@choc-ui/paginator";
import ProductGridItem from "../components/products/ProductGridItem";
import { IGatsbyImageData } from "gatsby-plugin-image";
import FilterGroup, {
  CheckboxType,
  FilterType,
  OptionType,
} from "../components/filter/FilterGroup";
import { Box, HStack, Stack, Text, useBreakpointValue } from "@chakra-ui/react";

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
  const [varietyFilter, setVarietyFilter] = useQueryParamString("variety", "");

  const [categoryFilter, setCategoryFilter] = useQueryParamString(
    "category",
    ""
  );

  const [page, setPage] = React.useState<number>(1);
  const pageSize = useBreakpointValue({ base: 10, lg: 12, "2xl": 16 });

  const products = data.allDatasetJson.nodes.filter(
    (p: ProductItem) =>
      (!categoryFilter || categoryFilter.split("|").includes(p.product_type)) &&
      (!varietyFilter || p.coarse_class_name === varietyFilter)
  );

  const product_types = data.allDatasetJson.unique_product_type;
  const coarse_class_names = [
    ...new Set(
      data.allDatasetJson.nodes
        .filter(
          (p: ProductItem) =>
            !categoryFilter ||
            categoryFilter.split("|").includes(p.product_type)
        )
        .map((p: ProductItem) => p.coarse_class_name)
    ),
  ];

  if (varietyFilter && !coarse_class_names.includes(varietyFilter)) {
    setVarietyFilter("");
  }

  const filters: (FilterType | CheckboxType)[] = [
    {
      type: "select",
      id: "variety",
      options: coarse_class_names.map(toOption),
      label: "Variety",
      value: varietyFilter || "",
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setVarietyFilter(event.target ? event.target.value : "");
      },
    },
    {
      type: "checkbox",
      id: "category",
      label: "Category",
      value: categoryFilter.split("|") || "",
      options: product_types.map(toOption),
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target) {
          setCategoryFilter("");
        } else {
          const choices = categoryFilter.split("|");
          if (event.target.checked) {
            choices.push(event.target.value);
          } else {
            choices.splice(choices.indexOf(event.target.value), 1);
          }
          console.log(choices);
          setCategoryFilter(
            event.target ? choices.filter((v) => v != "").join("|") : ""
          );
        }
      },
    },
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
                  description={description ? description.split(".")[0] : ""}
                  title={class_name}
                  product_type={product_type}
                  coarse_class_name={coarse_class_name}
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
