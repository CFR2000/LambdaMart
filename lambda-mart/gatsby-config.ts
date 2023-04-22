import type { GatsbyConfig } from "gatsby";

const plugin = (resolve: string, options?: any, __key?: string) => ({
  resolve,
  options,
  __key,
});

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
    "gatsby-transformer-sharp",
    plugin(
      "gatsby-source-filesystem",
      { name: "images", path: "./src/images/" },
      "images"
    ),
    plugin(
      "gatsby-source-filesystem",
      { name: "pages", path: "./src/pages/" },
      "pages"
    ),
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
