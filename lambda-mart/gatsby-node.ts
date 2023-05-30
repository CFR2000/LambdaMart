import path from "path";
import { GatsbyNode } from "gatsby";

const query = `#graphql
  query ProductPages {
    allDataJson {
      nodes {
        classId
        key
        className
        coarseClassName
        productType
        description
        imagePath {
          childImageSharp {
            gatsbyImageData(
              width: 350
              height: 350
              quality: 100
              placeholder: BLURRED
              formats: [PNG, WEBP, AUTO]
              transformOptions: { cropFocus: ATTENTION }
            )
          }
        }
      }
    }
  }
`;

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions: { createPage },
}) => {
  const result = await graphql<any>(query, {
    limit: 1000,
  });

  if (result.errors) {
    throw result.errors;
  } else if (result.data === undefined) {
    throw new Error("No data returned from GraphQL query");
  }

  const component = path.resolve("./src/templates/ProductTemplatePage.tsx");
  const { nodes } = result.data.allDataJson;

  // Create product pages.
  for (const { key, ...context } of nodes) {
    createPage({
      // Path for this page — required
      path: key!,
      component,
      context,
    });
  }
};
