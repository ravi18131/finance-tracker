import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ITransaction } from "@/lib/interfaces";
import { format } from "date-fns";
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

export const transaction_columns = (
  onEdit: (transaction: ITransaction) => void,
  onDelete: (id: string) => void
): ColumnDef<ITransaction>[] => {
  return [
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
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell({ row }) {
        return format(row.original.date, "PP");
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell({ row }) {
        return format(row.original.createdAt, "PP");
      },
    },
    {
      accessorKey: "actions",
      header: "Action",
      cell({ row }) {
        const transaction = row.original;
        return (
          <div className="flex gap-2">
            {/* Edit button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit(transaction)}
            >
              <Edit className="h-4 w-4" />
            </Button>

            {/* Delete button with confirmation */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this transaction?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. The transaction will be
                    permanently removed from the system.
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
          </div>
        );
      },
    },
  ];
};
