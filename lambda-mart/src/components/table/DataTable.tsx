/**
 * Taken from https://chakra-ui.com/getting-started/with-react-table
 */

import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Skeleton,
  Box,
  Text,
  Heading,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  Header,
  Cell,
} from "@tanstack/react-table";

export type DataTableProps<Data> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
};

export function DataTable<Data extends object>({
  data,
  columns,
}: DataTableProps<Data>) {
  if (!data.length) {
    return (
      <Box p="8" textAlign="center">
        <Text fontSize="lg" fontWeight="500" opacity="0.5">
          No vendors available
        </Text>
      </Box>
    );
  }
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const HeaderItem = ({ header }: { header: Header<Data, unknown> }) => {
    // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
    const meta: any = header.column.columnDef.meta;
    return (
      <Th
        key={header.id}
        onClick={header.column.getToggleSortingHandler()}
        isNumeric={meta?.isNumeric}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}

        <chakra.span pl="4">
          {header.column.getIsSorted() ? (
            header.column.getIsSorted() === "desc" ? (
              <TriangleDownIcon aria-label="sorted descending" />
            ) : (
              <TriangleUpIcon aria-label="sorted ascending" />
            )
          ) : null}
        </chakra.span>
      </Th>
    );
  };

  const RowCell = ({ cell }: { cell: Cell<Data, unknown> }) => {
    // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
    const meta: any = cell.column.columnDef.meta;
    return (
      <Td key={cell.id} isNumeric={meta?.isNumeric}>
        <Skeleton
          isLoaded={Boolean(cell.getValue() || meta?.isDisplay)}
          height="1.2em"
          speed={1}
          borderRadius="sm"
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </Skeleton>
      </Td>
    );
  };

  return (
    <Table>
      <Thead position="sticky" top={0} margin={0}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id} whiteSpace="nowrap">
            {headerGroup.headers.map((header) => (
              <HeaderItem header={header} key={header.id} />
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <RowCell cell={cell} key={cell.id} />
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
