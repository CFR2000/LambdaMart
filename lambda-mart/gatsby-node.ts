import path from "path";
import { GatsbyNode } from "gatsby";

const query = `#graphql
    query ProductPages {
        broker {
            products {
                key
                classId
                imagePath
            }
        }
    }
`;

type ProductPage = Queries.Broker_Product;

type ProductPagesQuery = {
  broker: {
    products: ProductPage[];
  };
};

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions: { createPage },
}) => {
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter

  const result = await graphql<ProductPagesQuery>(query, {
    limit: 1000,
  });

  if (result.errors) {
    throw result.errors;
  } else if (result.data === undefined) {
    throw new Error("No data returned from GraphQL query");
  }

  const component = path.resolve("./src/templates/ProductTemplatePage.tsx");

  // Create blog post pages.
  for (const { key, classId, imagePath } of result.data.broker.products) {
    const originalName = imagePath?.split("/").at(-1);
    createPage({
      // Path for this page — required
      path: key!,
      component,
      context: {
        classId,
        originalName,
      },
    });
  }
};
