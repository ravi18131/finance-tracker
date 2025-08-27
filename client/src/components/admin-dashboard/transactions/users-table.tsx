import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IUser } from "@/lib/interfaces";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export const user_columns = (updateUserStatus: (id: string, data: { is_blocked: boolean; }) => void): ColumnDef<IUser>[] => {
    return [
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell({ row }) {
                return (
                    <p className="truncate text-start pl-1">{row?.original?.name}</p>
                );
            },
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "isBlocked",
            header: "Blocked",
            cell: ({ row }) => {
                return (
                    <Switch
                        checked={row?.original?.isBlocked}
                        onCheckedChange={async (value) => {
                            await updateUserStatus(row.original.id, { is_blocked: value });
                        }}
                    />
                );
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
            accessorKey: "name",
            header: "Action",
            cell({ row }) {
                return (
                    <>
                        <Link to={`/admin/transactions/${row.original.id}`}>
                            <Button variant="outline" size="sm">
                                <Eye /> Transaction
                            </Button>
                        </Link>
                    </>
                )
            },
        },
    ];
};