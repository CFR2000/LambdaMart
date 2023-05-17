import React from "react";
import { HeadFC, Link, PageProps } from "gatsby";

import { Button, Box, useToast } from "@chakra-ui/react";
import GridList from "../components/presentation/GridList";
import Layout from "../layouts/page-layout";

const IndexPage: React.FC<PageProps> = (props) => {
  // const [product, setProduct] = useQueryParam("product", StringParam);
  const toast = useToast();
  return (
    <Layout>
      <Box maxW="3xl" marginInline="auto">
        {/* <Text>Product: {product || "Nothing"}</Text> */}
        <Button
          as={Link}
          to="/fruits/apples/demo-apple"
          marginInline="auto"
          variant="link"
        >
          Go to demo page
        </Button>
      </Box>
      <Box maxW="4xl" marginInline="auto">
        <GridList
          title="Get products"
          cta="Click this button!"
          description={
            <span>
              Get more out of your time, get time out of your more.
              Biologically, organicalistic, and all the genetic funnelling
              principled component homogony one could ever dream of. Don't
              believe us? Then, I dunno, <em>go away maybe</em>?
            </span>
          }
          onClickCTA={() => {
            toast({ title: "CLICK", description: "Well done, great job!" });
          }}
          features={[
            {
              heading: "Distributed",
              text: "Well I sure hope so!",
            },
            {
              heading: "A heading",
              text: "And some text",
            },
            {
              heading: "Superb work gents",
              text: "This has really been worth all of the work",
            },
          ]}
        />
      </Box>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
