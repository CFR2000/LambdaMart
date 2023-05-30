import React from "react";

import Layout from "../layouts/page-layout";

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Spinner,
  Stack,
  Text,
  Image,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import { Vendor } from "../types";

const VendorCard = ({
  icon,
  title,
  description,
  toast,
}: Vendor & { toast: any }) => (
  <Card maxW="sm">
    <CardBody>
      <Image src={icon} alt={`The icon for {title}`} borderRadius="lg" />
      <Stack mt="6" spacing="3">
        <Heading size="md">{title}</Heading>
        <Text>{description}</Text>
      </Stack>
    </CardBody>
    <Divider />
    <CardFooter>
      <ButtonGroup spacing="2">
        <Button
          variant="solid"
          colorScheme="blue"
          onClick={toast({
            title: "Clicked",
            description: "That was fun wasn't it?",
            status: "success",
            duration: 900,
            isClosable: true,
            colorScheme: "primary",
          })}
        >
          Click a button?
        </Button>
        <Button
          variant="ghost"
          colorScheme="danger"
          onClick={toast({
            title: "WHAT DID YOU DO?!",
            description: "You took down the website!",
            status: "error",
            duration: 9000,
            isClosable: true,
            colorScheme: "secondary",
          })}
        >
          Take down website
        </Button>
      </ButtonGroup>
    </CardFooter>
  </Card>
);

const Vendors = () => {
  const { data, loading } = useQuery(
    gql`
      query Vendors {
        vendors {
          description
          icon
          title
          vendorId
        }
      }
    `,
    {
      pollInterval: 0,
    }
  );

  const toast = useToast();
  toast({
    title: "Account created.",
    description: "We've created your account for you.",
    status: "success",
    duration: 9000,
    isClosable: true,
    colorScheme: "primary",
  });
  return (
    <Layout>
      <Box maxW="7xl" mx="auto" py="md">
        <Heading as="h1">Vendors</Heading>

        {loading ? (
          <Spinner mx="auto" h="100%" />
        ) : (
          data?.vendors?.map((vendor: Vendor) => (
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              <VendorCard key={vendor.vendorId} {...vendor} toast={toast} />
            </SimpleGrid>
          ))
        )}
      </Box>
    </Layout>
  );
};

export default Vendors;
