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
import { useMutation } from "@tanstack/react-query";
import fetchApi from "@/lib/axios";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";

const FormSchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }).refine(
        (value) => {
            return value.includes("@");
        },
        { message: "Invalid email address" }
    ),
    password: z
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof FormSchema>;

export default function ReadOnlyUserForm({
    onSuccess,
    setOpenDialog,
}: {
    onSuccess: () => void;
    setOpenDialog: (open: boolean) => void;
}) {
    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {},
    });

    const mutation = useMutation({
        mutationFn: (data: FormValues) => {
            return fetchApi.post(`/auth/sign-up`, data);
        },
    });

    const onSubmit = (data: FormValues) => {
        const payload = { ...data, role: "READ_ONLY" }
        mutate(payload);
    };

    const mutate = (data: FormValues) => {
        mutation.mutate(data, {
            onSuccess: ({ data }) => {
                if (data.success && data.data && data.data.access_token) {
                    toast.success(data.message || "Read only user added successful!!");
                    form.reset();
                    onSuccess();
                    setOpenDialog(false);
                } else {
                    toast.error(data.message || "Something went wrong!!");
                }
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong!!");
                console.log("error", error);
            },
        });
    };

    return (
        <Card className="overflow-hidden">
            <CardContent>
                <Form {...form}>
                    <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="email@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="password"
                                                {...field}
                                            />
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
                                Continue <Spinner isLoading={mutation.isPending} />
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
