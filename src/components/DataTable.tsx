"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import type Purchase from "@/types/purchase";
import { Badge } from "./ui/badge";
import { Pencil } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";
import EditForm from "./EditForm";
import { Open_Sans } from "next/font/google";
import { ScrollArea } from "@/components/ui/scroll-area";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function DataTable() {
  const [data, setData] = useState<Purchase[]>([]);

  const columns: ColumnDef<Purchase>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const formatted: string = row.getValue("type");
        const capitalized =
          formatted.charAt(0).toUpperCase() + formatted.slice(1);

        return <Badge variant="outline">{capitalized}</Badge>;
      },
    },
    {
      accessorKey: "merchant",
      header: "Merchant",
    },
    {
      accessorKey: "total",
      header: () => <div className="text-right">Total</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("total"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="text-right">{formatted}</div>;
      },
    },
    {
      accessorKey: "tax",
      header: () => <div className="text-right">Tax</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("tax"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="text-right">{formatted}</div>;
      },
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => {
        const time = row.getValue("time");
        if (time === "") {
          return <>N/A</>;
        }

        let formattedTime = "";

        if (typeof time === "string" && /^\d{2}:\d{2}$/.test(time)) {
          const [hourStr, minuteStr] = time.split(":");
          let hour = parseInt(hourStr, 10);
          const ampm = hour >= 12 ? "PM" : "AM";
          hour = hour % 12 || 12;
          formattedTime = `${hour}:${minuteStr} ${ampm}`;
        }

        return <>{formattedTime}</>;
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(date);

        return <>{formattedDate}</>;
      },
    },
    {
      accessorKey: "edit",
      header: "Edit",
      cell: ({ row }) => {
        const currentValues = {
          id: String(row.original._id),
          title: String(row.getValue("title")),
          merchant: String(row.getValue("merchant")),
          total: String(row.getValue("total")),
          tax: String(row.getValue("tax")),
          date: String(row.getValue("date")),
          time: String(row.getValue("time")),
          type: String(row.getValue("type")) as "receipt" | "invoice",
        };

        return (
          <Sheet>
            <SheetTrigger className="hover:cursor-pointer">
              <Pencil className="w-5" />
            </SheetTrigger>
            <SheetContent>
              <ScrollArea className="max-h-[100vh]">
                <SheetHeader>
                  <SheetTitle className={openSans.className}>
                    Edit purchase
                  </SheetTitle>
                  <SheetDescription className={openSans.className}>
                    Edit the purchase to change any incorrect or missing
                    information.
                  </SheetDescription>
                </SheetHeader>
                <div className="px-4 py-6">
                  <EditForm
                    {...currentValues}
                    onSuccess={handleFetchReceipts}
                  />
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        );
      },
    },
  ];

  async function handleFetchReceipts() {
    const res = await fetch("/api/get-purchases", { method: "GET" });
    const purchases = await res.json();
    setData(purchases);
  }

  useEffect(() => {
    handleFetchReceipts();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
}
