import React, { MouseEventHandler } from "react";

import { GatsbyImage, GatsbyImageProps } from "gatsby-plugin-image";

import {
  Wrap,
  WrapItem,
  Skeleton,
  Box,
  Heading,
  Text,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

const Hero = ({
  img,
  title,
  description,
  onBuyNowClick,
}: {
  img?: GatsbyImageProps;
  title: string;
  description: string;
  onBuyNowClick: MouseEventHandler<HTMLElement>;
}) => {
  const [topText, ...desc] = description.split(".");
  const bottomText = desc.join(".");
  return (
    <Wrap
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="center"
      placeItems="stretch"
      spacing={"3em"}
    >
      <WrapItem
        flexGrow={0}
        w={{ base: "2xs", sm: "xs", md: "sm" }}
        h={{ base: "2xs", sm: "xs", md: "sm" }}
      >
        <Skeleton w="100%" h="100%" speed={0.9}>
          {img && <GatsbyImage {...img} />}
        </Skeleton>
      </WrapItem>
      <WrapItem flexGrow={1} flexBasis="0" maxW="lg">
        <Box>
          <Heading lineHeight="8" fontSize="4xl" pb="3">
            {title}
          </Heading>
          <Heading as="h4" fontSize="md" fontWeight="300" pb="8" lineHeight="4">
            {topText}
          </Heading>
          {bottomText.split("\n").map((text, i) => (
            <Text key={i} fontSize="sm">
              {text}
            </Text>
          ))}
          <ButtonGroup marginBlock="4">
            <Button colorScheme="secondary" onClick={onBuyNowClick}>
              Buy now
            </Button>
            <Button colorScheme="secondary" variant="outline">
              See vendors
            </Button>
          </ButtonGroup>
        </Box>
      </WrapItem>
    </Wrap>
  );
};

export default Hero;
