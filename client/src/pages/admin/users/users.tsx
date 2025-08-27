import { useMutation, useQuery } from "@tanstack/react-query";
import { Printer } from "lucide-react";
import Spinner from "@/components/shared/spinner";
import { user_columns } from "../../../components/admin-dashboard/users/users-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import fetchApi from "@/lib/axios";

export default function Users() {
    const query = useQuery({
        queryKey: ["users"],
        queryFn: () => {
            return fetchApi.get(`/admin/users`);
        },
    });

    const mutation = useMutation({
        mutationFn: (data: any) => {
            return fetchApi.patch(`/admin/users/${data.id}`, { is_blocked: data.is_blocked });
        },
    });

    const updateUserStatus = (
        id: string,
        { is_blocked }: { is_blocked: boolean; }
    ) => {
        const payload = {
            id,
            is_blocked,
        }

        mutation.mutate(payload, {
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
        });
    };

    const export_data = async () => {
        console.log("Exporting data");
    };

    return (
        <section>
            <div className="flex items-center justify-between mb-2">
                <div>
                    <p className=" text-lg font-semibold">Manage users</p>
                </div>
                <Button onClick={export_data}>
                    <Printer className="w-5 h-5 mr-2" /> Export{" "}
                    <Spinner loading={false} />
                </Button>
            </div>

            {!query.isPending ? (
                <DataTable
                    columns={user_columns(updateUserStatus)}
                    data={query.data?.data.data.users || []}
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
