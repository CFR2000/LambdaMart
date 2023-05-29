import React, { PropsWithChildren } from "react";

import Header from "../components/page/header/Header";
import Footer from "../components/page/header/Footer";
import { Box, Grid, GridItem } from "@chakra-ui/react";

const Layout: React.FC<PropsWithChildren> = ({ children = null }) => {
  return (
    <>
      <Header />
      <Grid
        width="100%"
        minH="100vh"
        gridTemplateRows="auto 1fr auto"
        alignContent="start"
      >
        <GridItem maxH="min-content"></GridItem>
        <GridItem height="100%">
          <Box marginInline="auto">
            {children || <p>Nothing to see here...</p>}
          </Box>
        </GridItem>
        <GridItem maxH="min-content">
          <Footer copyright="© 2023 Lambda mart. No rights reserved" />
        </GridItem>
      </Grid>
    </>
  );
};

export default Layout;
