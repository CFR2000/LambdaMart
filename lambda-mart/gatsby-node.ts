const path = require(`path`);

exports.createPages = ({ graphql, actions }: any) => {
  const { createPage } = actions;
  const productPageTemplate = path.resolve(`src/templates/product-page.tsx`);
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(
    `
      query loadPagesQuery($limit: Int! = 1000) {
        allDatasetJson(limit: $limit) {
          edges {
            node {
              class_name
              coarse_class_name
              product_type
              country
              description
              id
              image: image_path {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                    width: 250
                  )
                }
              }
            }
          }
        }
      }
    `,
    { limit: 1000 }
  ).then((result: any) => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog post pages.
    result.data.allDatasetJson.edges.forEach((edge: any) => {
      createPage({
        // Path for this page — required
        path: `${edge.node.product_type}/${edge.node.coarse_class_name}/${edge.node.class_name}`,
        component: productPageTemplate,
        context: {
          ...edge.node,
          // Add optional context data to be inserted
          // as props into the page component.
          //
          // The context data can also be used as
          // arguments to the page GraphQL query.
          //
          // The page "path" is always available as a GraphQL
          // argument.
        },
      });
    });
  });
};
