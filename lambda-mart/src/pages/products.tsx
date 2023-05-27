import React, { ChangeEvent } from "react";
import { useQueryParamString } from "react-use-query-param-string";

import { PageProps, graphql } from "gatsby";
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
  query ProductsPage {
    broker {
      products {
        className
        classId
        coarseClassName
        description
        imagePath
        key
        productType
      }
    }
  }
`;
// export const query = graphql`
//     query ProductQuery {
//         allDatasetJson {
//             unique_coarseClassName: distinct(field: { coarseClassName: SELECT })
//             unique_productType: distinct(field: { productType: SELECT })
//             nodes {
//                 className
//                 coarseClassName
//                 description
//                 country
//                 id
//                 image: imagePath {
//                     childImageSharp {
//                         gatsbyImageData(
//                             width: 200
//                             placeholder: BLURRED
//                             formats: [PNG, WEBP, AUTO]
//                         )
//                     }
//                 }
//                 classId
//                 productType
//             }
//         }
//     }
// `;

const filterProducts = (
  products: any[],
  typeFilter: string[] | string = "",
  coarseFilter: string[] | string = ""
) => {
  if (typeof typeFilter === "string") {
    typeFilter = typeFilter.split("|");
  }
  if (typeof coarseFilter === "string") {
    coarseFilter = coarseFilter.split("|");
  }
  return products.filter(
    (p) =>
      (!typeFilter || typeFilter.includes(p.productType)) &&
      (!coarseFilter || coarseFilter.includes(p.coarseClassName))
  );
};

const toOption: (x: string) => OptionType = (x) => ({
  value: x,
  label: x,
});

const ProductPage: React.FC<PageProps<Queries.ProductsPageQuery>> = ({
  data,
}: any) => {
  const [coarseFilter, setCoarseFilter] = useQueryParamString("variety", "");
  const [typeFilter, setTypeFilter] = useQueryParamString("category", "");

  const [page, setPage] = React.useState<number>(1);
  const pageSize = useBreakpointValue({ base: 10, lg: 12, "2xl": 16 });
  console.log(data);

  const products = filterProducts(
    data.broker.products,
    typeFilter,
    coarseFilter
  );

  const productTypes = [
    ...new Set(data.broker.products.map((p) => p.productType)),
  ];

  const coarseClassNames = [
    ...new Set(
      data.broker.products
        .filter(
          (p) => !typeFilter || typeFilter.split("|").includes(p.productType)
        )
        .map((p) => p.coarseClassName)
    ),
  ];

  if (coarseFilter && !coarseClassNames.includes(coarseFilter)) {
    setCoarseFilter("");
  }

  const filters: (FilterType | CheckboxType)[] = [
    {
      type: "select",
      id: "variety",
      options: coarseClassNames.map(toOption),
      label: "Variety",
      value: coarseFilter || "",
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setCoarseFilter(event.target ? event.target.value : "");
      },
    },
    {
      type: "checkbox",
      id: "category",
      label: "Category",
      value: typeFilter.split("|") || "",
      options: productTypes.map(toOption),
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target) {
          setTypeFilter("");
        } else {
          const choices = typeFilter.split("|");
          if (event.target.checked) {
            choices.push(event.target.value);
          } else {
            choices.splice(choices.indexOf(event.target.value), 1);
          }
          console.log(choices);
          setTypeFilter(
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
        {/* <ProductGrid>
                    {products
                        .slice(from, to)
                        .map(
                            (
                                {
                                    id,
                                    image,
                                    description,
                                    className,
                                    coarseClassName,
                                    productType,
                                }: ProductItem,
                                i: number
                            ) => (
                                <ProductGridItem
                                    key={id}
                                    image={image}
                                    price="€420.69"
                                    rating={(i * i) % 6}
                                    description={
                                        description
                                            ? description.split(".")[0]
                                            : ""
                                    }
                                    title={className}
                                    productType={productType}
                                    coarseClassName={coarseClassName}
                                />
                            )
                        )}
                </ProductGrid> */}
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
