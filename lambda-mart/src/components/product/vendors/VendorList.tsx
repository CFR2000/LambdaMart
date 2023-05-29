import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "../../table/DataTable";
import {
  Box,
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Link as ChakraLink,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { Link, PageProps, graphql, useStaticQuery } from "gatsby";
import { getTime } from "../../../utils/time";

export type VendorTableType = {
  Vendor: string;
  Stock?: string;
  TimeToDeliver?: Date;
  Price?: number;
};

const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

const columnHelper = createColumnHelper<VendorTableType>();

const moneyFormatter = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
});

const VendorLink = ({ vendor }: { vendor: string }) => (
  <ChakraLink as={Link} to="" whiteSpace="nowrap">
    {vendor}
  </ChakraLink>
);

// TODO: Add on click stuff to actually hook it into some logic
const QuantitySelector = () => (
  <NumberInput size="xs" maxW={16} defaultValue={1} min={1}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
);

const AddToCartButton = () => (
  <Button size="xs" variant="ghost">
    Add to cart
  </Button>
);

const columns = [
  columnHelper.accessor("Vendor", {
    cell: (info) => <VendorLink key={info.cell.id} vendor={info.getValue()} />,
    header: "Vendor",
  }),
  columnHelper.accessor("Stock", {
    cell: (info) => info.getValue(),
    header: "Stock",
  }),
  columnHelper.accessor("TimeToDeliver", {
    cell: (info) => getTime(info.getValue() || new Date()),
    header: "Delivery time",
  }),
  columnHelper.accessor("Price", {
    cell: (info) => moneyFormatter.format(info.getValue() || 0),
    header: "Price (per unit)",
    meta: {
      isNumeric: true,
    },
  }),
  columnHelper.display({
    id: "quantity",
    header: "Quantity",
    cell: (info) => <QuantitySelector key={info.cell.id} />,
    meta: {
      isDisplay: true,
    },
  }),
  columnHelper.display({
    id: "add-to-cart",
    header: "Add to cart",
    cell: (info) => <AddToCartButton key={info.cell.id} />,
    meta: {
      isDisplay: true,
      isNumeric: true,
    },
  }),
];

const Vendor = ({ icon, vendorName }) => (
  <Text size="md" placeContent={"center"}>
    <Avatar size="sm" src={icon} name={vendorName} mr={2} />
    {vendorName}
  </Text>
);

const VendorList: React.FC<{ stockLevels: Queries.Broker_InventoryItem[] }> = ({
  stockLevels,
}) => {
  const data = useStaticQuery<Queries.VendorsQuery>(graphql`
    query Vendors {
      broker {
        vendors {
          icon
          title
          vendorId
        }
      }
    }
  `);

  const idToVendor = new Map<string, Queries.Broker_Vendor>(
    data.broker.vendors.map((vendor) => [vendor.vendorId, vendor])
  );

  const tableData = stockLevels.map((stockLevel) => {
    const vendor = idToVendor.get(stockLevel.vendorId);
    console.log(vendor);
    return {
      Vendor: (
        <Vendor
          icon={vendor.icon.replace(vendor?.vendorId, "localhost")}
          vendorName={vendor.title}
        />
      ),
      Stock: stockLevel.stockLevel,
      TimeToDeliver: new Date(Date.now() + units.day * 7 * Math.random()),
      Price: stockLevel.price,
    };
  });

  return (
    <Box overflowX="scroll">
      <DataTable columns={columns} data={tableData} />
    </Box>
  );
};

export default VendorList;
