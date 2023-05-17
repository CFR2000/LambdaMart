import React from "react";
import { HeadFC, PageProps } from "gatsby";
import {
  Box,
  useColorModeValue,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import VendorList, {
  VendorTableType,
} from "../../../../components/product/vendors/VendorList";
import ProductBreadcrumbs from "../../../../components/product/details/ProductBreadcrumbs";
import Hero from "../../../../components/product/details/Hero";
import { timeFrom } from "../../../../utils/time";
import Layout from "../../../../layouts/page-layout";

const DemoApplePage: React.FC<PageProps> = () => {
  const toast = useToast();
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.300");
  const { colorMode } = useColorMode();
  const data: VendorTableType[] = [
    {
      Vendor: "Fruit Fanatics",
      Stock: "16",
      TimeToDeliver: timeFrom({ day: 2 }),
      Price: 4.48,
    },
    {
      Vendor: "Snails Inc.",
      // Stock: "50+",
      TimeToDeliver: timeFrom({ month: 10 }),
      // Price: 4.4,
    },
    {
      Vendor: "The Apple Boys",
      Stock: "3",
      TimeToDeliver: timeFrom({ hour: 14 }),
      Price: 5.5,
    },
  ];

  return (
    <Layout>
      <Box
        maxW="1200px"
        marginInline="auto"
        paddingInline={{ base: "4", md: "8" }}
        paddingBlock="8"
      >
        <Box pb="16">
          <ProductBreadcrumbs
            product="Fruits"
            category="Apples"
            title="Demo apple"
          />
        </Box>
        <Box>
          <Hero
            title="Lorem ipsum dolor sit."
            description={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem possimus quam obcaecati dolores hic illum eaque, quae aut eum necessitatibus cum facilis harum laboriosam tenetur cupiditate magnam et quia inventore!\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum debitis suscipit deleniti aut nemo iste tempora atque vero minima cumque?"
            }
            onBuyNowClick={() =>
              toast({ title: "Click!", description: "You clicked the button!" })
            }
          />
        </Box>
        <Box
          marginBlock="8"
          border="1px"
          borderColor={colorMode === "light" ? "gray.200" : "whiteAlpha.300"}
          borderRadius="sm"
        >
          <VendorList data={data} />
        </Box>
      </Box>
    </Layout>
  );
};

export default DemoApplePage;

export const Head: HeadFC = () => <title>A demo apple page</title>;
