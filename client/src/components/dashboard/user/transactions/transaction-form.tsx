import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import fetchApi from "@/lib/axios";
import { toast } from "sonner";
import Spinner from "@/components/ui/spinner";
import { ITransaction } from "@/lib/interfaces";

const FormSchema = z.object({
    type: z.enum(["INCOME", "EXPENSE"], {
        required_error: "Transaction type is required",
    }),
    amount: z
        .string({ required_error: "Amount is required" })
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Amount must be a valid number greater than 0",
        }),
    category: z.string({ required_error: "Category is required" }),
    description: z.string().optional(),
    date: z.string({ required_error: "Date is required" }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function UserTransactionForm({
    onSuccess,
    setOpenDialog,
    isEditing,
    transation,
}: {
    onSuccess: () => void;
    isEditing?: boolean;
    transation?: ITransaction;
    setOpenDialog: (open: boolean) => void;
}) {

    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            type: transation?.type || "EXPENSE",
            amount: transation?.amount.toString() || "",
            category: transation?.category || "",
            description: transation?.description || "",
            date: transation ? new Date(transation.date).toISOString().split("T")[0] : "",
        },
    });

    const mutation = useMutation({
        mutationFn: (data: FormValues) => {
            if (isEditing) {
                return fetchApi.patch(`/user/transactions/${transation?.id}`, {
                    ...data,
                    amount: Number(data.amount),
                    date: new Date(data.date),
                });
            } else {
                return fetchApi.post(`/user/transactions`, {
                    ...data,
                    amount: Number(data.amount),
                    date: new Date(data.date),
                });
            }
        },
    });

    const onSubmit = (data: FormValues) => {
        mutate(data);
    };

    const mutate = (data: FormValues) => {
        mutation.mutate(data, {
            onSuccess: ({ data }) => {
                if (data.success) {
                    toast.success(data.message || "Transaction added successfully!");
                    form.reset();
                    onSuccess();
                    setOpenDialog(false);
                } else {
                    toast.error(data.message || "Something went wrong!");
                }
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong!");
                console.log("error", error);
            },
        });
    };

    console.log(form.watch());

    return (
        <Card className="overflow-hidden">
            <CardContent>
                <Form {...form}>
                    <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            {/* Transaction Type */}
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Transaction Type</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="INCOME">Income</SelectItem>
                                                    <SelectItem value="EXPENSE">Expense</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Amount */}
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                placeholder="Enter amount"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Category */}
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Input placeholder="E.g. Food, Rent, Salary" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Optional note" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={mutation.isPending}
                            >
                                Save Transaction <Spinner isLoading={mutation.isPending} />
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
