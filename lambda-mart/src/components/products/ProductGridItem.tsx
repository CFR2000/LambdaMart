import React from "react";

import { Link as GatsbyLink } from "gatsby";
import { GatsbyImage, ImageDataLike, getImage } from "gatsby-plugin-image";

import {
  Box,
  Flex,
  GridItem,
  HStack,
  Heading,
  Text,
  Button,
  Card,
  Stack,
  CardBody,
  CardFooter,
  useBreakpointValue,
  Badge,
  Link,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export type ProductGridItemProps = {
  image: ImageDataLike;
  title: string;
  description: string;
  price: string;
  rating: number;
  product_type: string;
  coarse_class_name: string;
};

const positiveStar = (
  <StarIcon
    color="gray.700"
    _dark={{
      color: "gray.300",
    }}
  />
);

const negativeStar = (
  <StarIcon
    color="gray.300"
    _dark={{
      color: "gray.700",
    }}
  />
);

const ProductGridItem = ({
  image,
  title,
  description,
  rating,
  price,
  product_type,
  coarse_class_name,
}: ProductGridItemProps) => {
  const bp = useBreakpointValue({ base: false, md: true });
  const img = getImage(image)!;

  return (
    <GridItem>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Box
          minW="150px"
          minH="150px"
          alignSelf="center"
          p="3"
          borderRadius="md"
          overflow="hidden"
        >
          <GatsbyImage image={img} alt="" />
        </Box>

        <Stack justifyContent="space-evenly">
          <CardBody py={0} flex="">
            <Link
              as={GatsbyLink}
              to={`/${product_type}/${coarse_class_name}/${title}/`}
            >
              {title}
            </Link>
            <Heading size={{ base: "sm", lg: "md" }} noOfLines={1}></Heading>

            <Box h={{ base: "8", lg: "10" }} maxW="100%">
              {bp && (
                <Text
                  pt="2"
                  noOfLines={1}
                  //   maxW="100%"
                  fontSize={{ base: "xs", lg: "sm" }}
                  lineHeight={{ base: "1", lg: "1.75" }}
                >
                  {description}
                </Text>
              )}
            </Box>
          </CardBody>

          <CardFooter py={0}>
            <Stack
              flexDirection={{ base: "row", md: "column" }}
              justifyContent="space-between"
              w="100%"
            >
              <HStack spacing={1} display="flex" alignItems="center" mt={2}>
                {rating >= 1 ? positiveStar : negativeStar}
                {rating >= 2 ? positiveStar : negativeStar}
                {rating >= 3 ? positiveStar : negativeStar}
                {rating >= 4 ? positiveStar : negativeStar}
                {rating >= 5 ? positiveStar : negativeStar}
              </HStack>
              <HStack>
                <Badge>{product_type}</Badge>
                <Badge>{coarse_class_name}</Badge>
              </HStack>
              {/* <Button variant="solid" colorScheme="secondary">
                View product
              </Button> */}
            </Stack>
          </CardFooter>
        </Stack>
      </Card>
    </GridItem>
  );
};

export default ProductGridItem;
