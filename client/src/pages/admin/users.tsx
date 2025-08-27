import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Spinner from "@/components/shared/spinner";
import { user_columns } from "../../components/admin-dashboard/users/users-table";
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
    DialogTrigger,
} from "@/components/ui/dialog";
import ReadOnlyUserForm from "../../components/admin-dashboard/users/read-only-user-form";
import { useState } from "react";

export default function Users() {
    const [openDialog, setOpenDialog] = useState(false);

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

    return (
        <section>
            <div className="flex items-center justify-between mb-5">
                <p className=" text-lg font-semibold">Manage users</p>

                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                        <Button className="rounded-sm">
                            <Plus className="w-5 h-5 mr-2" /> Add Read Only User
                            <Spinner loading={false} />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Read Only User</DialogTitle>
                            <DialogDescription>
                                Fill in the details below to create a read-only user.
                            </DialogDescription>
                        </DialogHeader>

                        <ReadOnlyUserForm
                            onSuccess={() => {
                                query.refetch();
                                setOpenDialog(false);
                            }}
                            setOpenDialog={setOpenDialog}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            {!query.isPending ? (
                <DataTable
                    columns={user_columns(updateUserStatus)}
                    data={query.data?.data.data.users || []}
                    search_label="Name"
                    search_key="name"
                    export_btn={true}
                    filters={[
                        {
                            key: "role",
                            title: "Role",
                            options: [
                                {
                                    label: "Admin",
                                    value: "ADMIN",
                                },
                                {
                                    label: "User",
                                    value: "USER",
                                },
                                {
                                    label: "Read Only",
                                    value: "READ_ONLY",
                                },
                            ],
                        },
                        {
                            key: "isBlocked",
                            title: "Blocked",
                            options: [
                                {
                                    label: "True",
                                    value: true,
                                },
                                {
                                    label: "False",
                                    value: false,
                                },
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
        </section>
    );
}
