import React from "react";
import { HeadFC, Link, PageProps, graphql } from "gatsby";

import { Button, Box, useToast } from "@chakra-ui/react";
import GridList from "../components/presentation/GridList";
import Layout from "../layouts/page-layout";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage: React.FC<PageProps> = (props) => {
  // const [product, setProduct] = useQueryParam("product", StringParam);
  const toast = useToast();
  return (
    <Layout>
      <Box mt={6} maxW="4xl" marginInline="auto">
        <Box mx={{ base: 2, md: 8 }} borderRadius={"sm"} overflow="hidden">
          <StaticImage
            transformOptions={{ cropFocus: "attention" }}
            src="../images/promo-shot.jpeg"
            alt="Promo shot"
            aspectRatio={5 / 3}
          />
        </Box>
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
            toast({
              title: "CLICK",
              description: "Well done, great job!",
            });
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
