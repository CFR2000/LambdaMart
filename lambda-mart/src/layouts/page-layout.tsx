import React, { PropsWithChildren } from "react";
import { HeadFC } from "gatsby";

import Header from "../components/page/header/Header";
import Footer from "../components/page/header/Footer";
import { Box, Grid, GridItem } from "@chakra-ui/react";

const Layout: React.FC<PropsWithChildren> = ({ children = null }) => {
  return (
    <Grid width="100%" minH="100vh">
      <GridItem>
        <Header />
      </GridItem>
      <GridItem>
        <Box marginInline="auto">
          {children || <p>Nothing to see here...</p>}
        </Box>
      </GridItem>
      <GridItem alignSelf="end">
        <Footer copyright="© 2023 Lambda mart. No rights reserved" />
      </GridItem>
    </Grid>
  );
};

export default Layout;

export const Head: HeadFC = () => <title>Home Page</title>;
