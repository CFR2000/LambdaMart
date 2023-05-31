import React, { useState } from "react";

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
}: Vendor & { toast: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Card maxW="lg" alignItems={"center"}>
      <CardBody>
        <Image src={icon} alt={`The icon for ${title}`} borderRadius="lg" />
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
            onClick={() =>
              toast({
                title: "Clicked",
                description: "That was fun wasn't it?",
                status: "success",
                duration: 900,
                isClosable: true,
                colorScheme: "primary",
              })
            }
          >
            Click a button?
          </Button>
          <Button
            isLoading={isLoading}
            variant="ghost"
            colorScheme="red"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                toast({
                  title: "WHAT DID YOU DO?!",
                  description: "You took down the website!",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                  colorScheme: "red",
                });

                setTimeout(() => {
                  toast({
                    title: "Just kidding",
                    description: "You can't take down the website...yet",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                    colorScheme: "secondary",
                  });
                }, 2000);
              }, 4000);
            }}
          >
            Take down website
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

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

  return (
    <Layout>
      <Box maxW="7xl" mx="auto" py="md">
        <Heading as="h1" mt={8} mb={16}>
          Vendors
        </Heading>

        {loading ? (
          <Spinner mx="auto" h="100%" />
        ) : (
          <SimpleGrid
            spacing={4}
            w="100%"
            templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
          >
            {data?.vendors?.map((vendor: Vendor) => (
              <VendorCard key={vendor.vendorId} {...vendor} toast={toast} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Layout>
  );
};

export default Vendors;
