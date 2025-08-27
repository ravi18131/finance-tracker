import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ITransaction } from "@/lib/interfaces";
import { format } from "date-fns";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/context/session-context";
import { useState } from "react";

export const transaction_columns = (
  onEdit: (transaction: ITransaction) => void,
  onDelete: (id: string) => void
): ColumnDef<ITransaction>[] => [
    {
      accessorKey: "type",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell({ row }) {
        return <p className="truncate text-start pl-1">{row.original.type}</p>;
      },
    },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "amount", header: "Amount" },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => format(row.original.date, "PP"),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => format(row.original.createdAt, "PP"),
    },
    {
      accessorKey: "actions",
      header: "Action",
      cell: ({ row }) => (
        <TransactionActions
          transaction={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ];

interface Props {
  transaction: ITransaction;
  onEdit: (transaction: ITransaction) => void;
  onDelete: (id: string) => void;
}

export default function TransactionActions({ transaction, onEdit, onDelete }: Props) {
  const { user } = useSession();
  const [open, setOpen] = useState(false);

  // Non-admin → just show disabled button
  if (user?.role !== "ADMIN") {
    return (
      <Button variant="ghost" size="icon" disabled>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(transaction)}>
          <Edit className="mr-2 h-4 w-4" /> Edit
        </DropdownMenuItem>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()} // prevent menu close
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this transaction?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(transaction.id)}
              >
                Yes, Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
