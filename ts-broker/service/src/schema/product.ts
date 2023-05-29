import { gql } from "graphql-request";

export const typeDef = gql`
  # Represents a product that can be purchased from a vendor
  type Product {
    className: String! # The unique class name of the product, eg. "Golden-Delicious"
    classId: ID! # The unique index of the product in the dataset.json file, eg. 0
    coarseClassName: String # The class name of the product without the variety, eg. "Apple"
    imagePath: String # The path to the product's image
    productType: String # The type of product, eg. "Fruit"
    description: String # A description of the product
    country: String # The country of origin of the product
    volume: String # The volume of the product, eg. "1kg"
    key: String # The fully qualified key of the product, eg. "fruit.apple.golden-delicious"
  }
`;
