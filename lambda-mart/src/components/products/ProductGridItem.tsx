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
  path: string | number;
  image: ImageDataLike;
  title: string;
  description: string;
  price: string;
  rating: number;
  productType: string;
  coarseClassName: string;
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
  path,
  image,
  title,
  description,
  rating,
  price,
  productType,
  coarseClassName,
}: ProductGridItemProps) => {
  const bp = useBreakpointValue({ base: true, sm: false, md: true });
  const img = getImage(image)!;

  return (
    <GridItem>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Box
          w="150px"
          h="150px"
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
            <Link as={GatsbyLink} to={`/${path}`}>
              <Heading
                size={{ base: "sm", lg: "md" }}
                fontWeight={"500"}
                noOfLines={1}
                title={title}
              >
                {title}
              </Heading>
            </Link>

            {bp && (
              <Box h={{ base: "8", lg: "10" }} maxW="100%">
                <Text
                  pt="2"
                  noOfLines={1}
                  //   maxW="100%"
                  fontSize={{ base: "sm", lg: "md" }}
                  lineHeight={{ base: "1", lg: "1.75" }}
                  title={description}
                >
                  {description}
                </Text>
              </Box>
            )}
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
                <Badge>{productType}</Badge>
                <Badge>{coarseClassName}</Badge>
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
