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
  NumberInputProps,
  ButtonProps,
  Flex,
} from "@chakra-ui/react";
import { Link } from "gatsby";
import { getTime } from "../../../utils/time";
import { InventoryItem, Vendor } from "../../../types";

export type VendorTableType = {
  Vendor: Vendor;
  Stock?: string;
  TimeToDeliver?: Date;
  Price?: number;
};

type VendorListProps = {
  stockLevels: InventoryItem[];
  quantity: number;
  loading?: boolean;
  setQuantity: (_: any, qty: number) => void;
  purchaseItem: (vendor: any) => void;
};

const columnHelper = createColumnHelper<VendorTableType>();

const moneyFormatter = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
});

const VendorLink = ({ vendor, icon }: { vendor: Vendor; icon: string }) => (
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

const VendorList: React.FC<VendorListProps> = (props) => {
  const { loading, stockLevels, quantity, setQuantity, purchaseItem } = props;

  const tableData = stockLevels.map((item) => ({
    Vendor: item.vendor,
    Stock: !loading ? `${item.stockLevel}` : undefined,
    TimeToDeliver: new Date(item.timeToDeliver * 1000),
    Price: item.price,
  }));

  const columns = [
    columnHelper.accessor("Vendor", {
      cell: (info) => {
        if (!loading && info.getValue()) {
          const vendor = info.getValue();
          const icon = vendor.icon.replace(`${vendor.vendorId}`, "localhost");
          return <VendorLink key={info.cell.id} vendor={vendor} icon={icon} />;
        }
      },
      header: "Vendor",
    }),
    columnHelper.accessor("Stock", {
      cell: (info) => info.getValue(),
      header: "Stock",
    }),
    columnHelper.accessor("TimeToDeliver", {
      cell: (info) => getTime(info.getValue() || new Date(), new Date(0)),
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
          onClick={() => purchaseItem(info.getValue())}
          key={info.cell.id}
        />
      ),
      meta: {
        isDisplay: true,
        isNumeric: true,
      },
    }),
  ];

  return (
    <Box overflowX="scroll">
      <DataTable columns={columns} data={tableData} />
    </Box>
  );
};

export default VendorList;
