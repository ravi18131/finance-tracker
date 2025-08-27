import { useMutation, useQuery } from "@tanstack/react-query";
import { Download, MoveLeft } from "lucide-react";
import { user_columns } from "../../../components/dashboard/admin-readonly/transactions/users-table";
import { Button } from "@/components/ui/button";
import { DataTable, export_data } from "@/components/shared/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import fetchApi from "@/lib/axios";
import { Link } from "react-router-dom";
import { IUser } from "@/lib/interfaces";

export default function Transactions() {
    const query = useQuery({
        queryKey: ["users"],
        queryFn: () => fetchApi.get(`/admin/users`),
    });

    const mutation = useMutation({
        mutationFn: (data: any) =>
            fetchApi.patch(`/admin/users/${data.id}`, {
                is_blocked: data.is_blocked,
            }),
    });

    const updateUserStatus = (
        id: string,
        { is_blocked }: { is_blocked: boolean }
    ) => {
        mutation.mutate(
            { id, is_blocked },
            {
                onSuccess: ({ data: res }) => {
                    if (res.success) {
                        query.refetch();
                        toast.success("Success", {
                            description: "Status changed successfully",
                        });
                    } else {
                        toast.error("Error", {
                            description:
                                res.error?.message || res.error || "Something went wrong",
                        });
                    }
                },
            }
        );
    };

    const users =
        (query.data?.data.data.users || []).filter(
            (user: IUser) => user.role === "USER"
        );

    return (
        <section>
            <div className="flex items-center justify-between mb-5">
                {/* Left side: back button + title */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/dashboard"
                        className="rounded-full border border-black flex items-center justify-center w-8 h-8"
                    >
                        <MoveLeft className="w-4 h-4" />
                    </Link>
                    <div className="space-y-0">
                        <p className="text-lg font-semibold">Manage User Transactions</p>
                        <p className="text-gray-500">Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>


                {/* Right side: Add User Button */}
                <div className="flex justify-center items-center">
                    <Button onClick={() => export_data(users)}><Download /> Export</Button>
                </div>
            </div>


            {!query.isPending ? (
                <DataTable
                    columns={user_columns(updateUserStatus)}
                    data={users || []}
                    search_label="Name"
                    search_key="name"
                />
            ) : (
                <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            )}
        </section>
    );
}
