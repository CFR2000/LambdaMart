import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect } from "react";
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
  useToast,
  NumberInputProps,
  ButtonProps,
  AvatarProps,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { Link, PageProps, graphql, useStaticQuery } from "gatsby";
import { getTime } from "../../../utils/time";

export type VendorTableType = {
  Vendor: Queries.Broker_Vendor;
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

const VendorLink = ({
  vendor,
  icon,
}: {
  vendor: Queries.Broker_Vendor;
  icon: string;
}) => (
  <Flex m={0} p={0} height="100%" alignItems="center" gap={3}>
    <Avatar size={"sm"} src={icon} name={vendor.title} />
    <ChakraLink as={Link} to="" whiteSpace="nowrap">
      <Text mt={0}>{vendor.title}</Text>
    </ChakraLink>
  </Flex>
);

const QuantitySelector = ({ value, onChange }: NumberInputProps) => (
  <NumberInput size="xs" maxW={16} value={value} onChange={onChange} min={1}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
);

const AddToCartButton = ({ onClick }: ButtonProps) => (
  <Button size="xs" variant="ghost" onClick={onClick}>
    Buy now
  </Button>
);

const VendorList: React.FC<{
  itemId: string;
  stockLevels: Queries.Broker_InventoryItem[];
  quantity: number;
  setQuantity: (_, qty: number) => void;
  purchaseItem: (vendor: any) => (e: any) => Promise<void>;
}> = ({ itemId, stockLevels, quantity, setQuantity, purchaseItem }) => {
  const data = useStaticQuery<Queries.VendorsQuery>(graphql`
    query Vendors {
      broker {
        vendors {
          icon
          title
          url
          vendorId
        }
      }
    }
  `);

  const idToVendor = new Map(
    data.broker.vendors.map((vendor) => [vendor.vendorId, vendor])
  );

  const columns = [
    columnHelper.accessor("Vendor", {
      cell: (info) => {
        const vendor = info.getValue() as unknown as Queries.Broker_Vendor;
        const icon = vendor.icon.replace(vendor?.vendorId, "localhost");
        return <VendorLink key={info.cell.id} vendor={vendor} icon={icon} />;
      },
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
      cell: (info) => (
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          key={info.cell.id}
        />
      ),
      meta: {
        isDisplay: true,
      },
    }),
    columnHelper.accessor("Vendor", {
      id: "add-to-cart",
      header: "Add to cart",
      cell: (info) => (
        <AddToCartButton
          onClick={purchaseItem(info.getValue())}
          key={info.cell.id}
        />
      ),
      meta: {
        isDisplay: true,
        isNumeric: true,
      },
    }),
  ];

  const tableData = stockLevels.map((stockLevel) => {
    const vendor = idToVendor.get(stockLevel.vendorId);
    return {
      Vendor: vendor,
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
