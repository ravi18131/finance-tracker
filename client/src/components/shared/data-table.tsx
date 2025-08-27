import React from "react";
import * as XLSX from "xlsx";
import { File } from "lucide-react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  search?: {
    key: string;
    label: string;
  }[];
  filters?: {
    key: string;
    title: string;
    options: {
      label: string;
      value: string | number | boolean;
      icon?: React.ComponentType<{ className?: string }>;
    }[];
  }[];
  export_btn?: boolean;
  search_label?: string;
  search_key?: string;
  page_size?: number[];
}


export const export_data = (data: any[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create a workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Export the workbook to an XLSX file
  XLSX.writeFile(workbook, `${new Date().toISOString()}.xlsx`, {
    bookType: "xlsx",
    type: "buffer",
  });
};

export function DataTable<TData, TValue>({
  columns,
  data,
  page_size,
  search,
  export_btn,
  search_key,
  filters,
  search_label,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  // FIX: support string | number | boolean
  const [selectedFacets, setSelectedFacets] = React.useState<
    Record<string, string | number | boolean>
  >({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  React.useEffect(() => {
    table.setPageSize(Number(20));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {search_key && (
          <Input
            placeholder={`Search ${search_label ? search_label : ""}...`}
            value={
              (table.getColumn(search_key)?.getFilterValue() as string) ?? ""
            }
            type="search"
            onChange={(event) => {
              table.getColumn(search_key)?.setFilterValue(event.target.value);
            }}
            className="h-8 w-[150px] lg:w-[250px] bg-white"
          />
        )}
        {search &&
          search.map((item, index) => {
            return (
              <Input
                key={index}
                placeholder={`Search ${item.label}...`}
                value={
                  (table.getColumn(item.key)?.getFilterValue() as string) ?? ""
                }
                type="search"
                onChange={(event) => {
                  table.getColumn(item.key)?.setFilterValue(event.target.value);
                }}
                className="h-8 w-[150px] lg:w-[250px] bg-white"
              />
            );
          })}

        {filters?.map((filter) => (
          <DataTableFacetedFilter
            key={filter.key}
            column={table.getColumn(filter.key)}
            title={filter.title}
            options={filter.options}
            selected_value={selectedFacets[filter.key] ?? ""}
            set_selected_value={(val) =>
              setSelectedFacets((prev) => ({
                ...prev,
                [filter.key]: val,
              }))
            }
          />
        ))}

        {export_btn && (
          <Button
            variant="outline"
            className="h-8 px-2 lg:px-3 w-28"
            onClick={() => export_data(data)}
          >
            <File className="mr-3 h-5 w-5" />
            Export
          </Button>
        )}
      </div>
      <div className="rounded-none border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`${index === 0 ? "text-nowrap" : "text-nowrap text-center"
                        } `}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={`${index === 0 ? "pl-5" : "text-center"
                        } text-nowrap`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} page_size={page_size} />
      </div>
    </div>
  );
}
