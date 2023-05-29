import type { GatsbyConfig } from "gatsby";

const plugin = (resolve: string, options?: any, __key?: string) => ({
  resolve,
  options,
  __key,
});

const fileSystem = (name: string, path: string, __key?: string) =>
  plugin("gatsby-source-filesystem", { name, path }, __key);

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Lambda Mart`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    plugin("gatsby-plugin-manifest", { icon: "src/images/Lambda.png" }),
    "gatsby-transformer-sharp",
    "gatsby-transformer-json",
    fileSystem("images", "./src/images/", "images"),
    fileSystem("pages", "./src/pages/", "pages"),
    plugin("gatsby-plugin-apollo", {
      uri: process.env.GATSBY_BROKER_URL || new Error("No Broker URL"),
    }),
    plugin("gatsby-source-graphql", {
      typeName: "Broker",
      fieldName: "broker",
      url: process.env.GATSBY_BROKER_URL || new Error("No Broker URL"),
    }),
    plugin("@chakra-ui/gatsby-plugin", {
      /**
       * @property {boolean} [resetCSS=true]
       * if false, this plugin will not use `<CSSReset />
       */
      resetCSS: true,
      /**
       * @property {boolean} [isUsingColorMode=true]
       * if false, this plugin will not use <ColorModeProvider />
       */
      isUsingColorMode: true,
      /**
       * @property {boolean} [isBaseProvider=false]
       * if true, will render `<ChakraBaseProvider>`
       */
      isBaseProvider: false,
    }),
  ],
};

export default config;
