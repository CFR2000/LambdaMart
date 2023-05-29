/**
 * https://chakra-templates.dev/page-sections/features
 */
import React, { MouseEventHandler, ReactNode } from "react";
import {
  Box,
  VStack,
  Button,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
} from "@chakra-ui/react";

interface FeatureProps {
  heading: string;
  text: string;
}

const Feature = ({ heading, text }: FeatureProps) => {
  return (
    <GridItem>
      <chakra.h3 fontSize="xl" fontWeight="600">
        {heading}
      </chakra.h3>
      <chakra.p>{text}</chakra.p>
    </GridItem>
  );
};

const GridList = ({
  title,
  cta,
  description,
  onClickCTA,
  features,
}: {
  title: string;
  cta: string;
  description: ReactNode;
  onClickCTA: MouseEventHandler<HTMLElement>;
  features: FeatureProps[];
}) => (
  <Box as={Container} maxW="7xl" mt={14} p={4}>
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(2, 1fr)",
      }}
      gap={4}
    >
      <GridItem colSpan={1}>
        <VStack alignItems="flex-start" spacing="20px">
          <chakra.h2 fontSize="3xl" fontWeight="700">
            {title}
          </chakra.h2>
          <Button colorScheme="primary" size="md" onClick={onClickCTA}>
            {cta}
          </Button>
        </VStack>
      </GridItem>
      <GridItem>
        <Flex>
          <chakra.p>{description}</chakra.p>
        </Flex>
      </GridItem>
    </Grid>
    <Divider mt={12} mb={12} />
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
      }}
      gap={{ base: "8", sm: "12", md: "16" }}
    >
      {features.length &&
        features.map((props, i) => <Feature {...props} key={i} />)}
    </Grid>
  </Box>
);

export default GridList;
