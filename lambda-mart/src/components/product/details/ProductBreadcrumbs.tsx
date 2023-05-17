import React from "react";
import { Link } from "gatsby";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

const ProductBreadcrumbs = ({
  product,
  category,
  title,
}: {
  product: string;
  category: string;
  title: string;
}) => (
  <Breadcrumb>
    <BreadcrumbItem>
      <BreadcrumbLink as={Link} to="/">
        All products
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbLink
        as={Link}
        to={`/?product=${product.replaceAll(" ", "-").toLowerCase()}`}
      >
        {product}
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbLink
        as={Link}
        to={`/?product=${product
          .replaceAll(" ", "-")
          .toLowerCase()}&category=${category
          .replaceAll(" ", "-")
          .toLowerCase()}`}
      >
        {category}
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbLink isCurrentPage>{title}</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
);

export default ProductBreadcrumbs;
