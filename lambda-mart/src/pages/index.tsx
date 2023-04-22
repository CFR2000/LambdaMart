import * as React from "react";
import { HeadFC, PageProps } from "gatsby";

import Header from "../components/page/header/Header";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <Header />
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
