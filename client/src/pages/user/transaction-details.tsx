
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import fetchApi from "@/lib/axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ITransaction } from "@/lib/interfaces";
import Spinner from "@/components/ui/spinner";
import { user_transaction_columns } from "@/components/dashboard/user/transactions/transaction-table";
import UserTransactionForm from "@/components/dashboard/user/transactions/transaction-form";

export default function UserTransactionDetails() {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<ITransaction | null>(null);

  const query = useQuery({
    queryKey: [`transactions`],
    queryFn: () => fetchApi.get(`/user/transactions`),
  });

  // open dialog for editing
  const handleEdit = (transaction: ITransaction) => {
    setEditingTransaction(transaction);
    setOpenDialog(true);
  };

  // open dialog for new transaction
  const handleAdd = () => {
    setEditingTransaction(null);
    setOpenDialog(true);
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetchApi.delete(`/user/transactions/${id}`);
    },
    onSuccess: () => {
      toast.success("Transaction deleted successfully");
      query.refetch();
    },
    onError: () => {
      toast.error("Failed to delete transaction");
    },
  });

  const transactions = query.data?.data.data.transactions || [];

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        {/* Left side: back button + title */}
        <div className="space-y-0">
          <p className="text-lg font-semibold">Manage User Transactions</p>
          <p className="text-gray-500">Lorem ipsum dolor sit amet ipsum dolor.</p>
        </div>

        <div className="flex justify-center items-center">
          <Button onClick={handleAdd} className="rounded-sm flex items-center justify-center">
            <Plus className="w-5 h-5 mr-2" />
            Add New Transaction
            <Spinner isLoading={false} />
          </Button>
        </div>

      </div>


      {!query.isPending ? (
        <DataTable
          columns={user_transaction_columns(handleEdit, (id: string) => deleteMutation.mutate(id))}
          data={transactions || []}
          search_label="Category"
          search_key="category"
          export_btn={true}
          filters={[
            {
              key: "type",
              title: "Transaction Type",
              options: [
                { label: "Income", value: "INCOME" },
                { label: "Expense", value: "EXPENSE" },
              ],
            },
          ]}
        />
      ) : (
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      )}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
            </DialogTitle>
            <DialogDescription>
              {editingTransaction
                ? "Update the transaction details."
                : "Fill in the details below to create a new transaction."}
            </DialogDescription>
          </DialogHeader>

          <UserTransactionForm
            isEditing={!!editingTransaction}
            transation={editingTransaction || undefined}
            onSuccess={() => {
              query.refetch();
              setOpenDialog(false);
            }}
            setOpenDialog={setOpenDialog}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}
