import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const FormSchema = z.object({
  hash: z.string({ required_error: "Hash is required" }),
  new_password: z.string({ required_error: "New password is required" }),
  confirm_password: z.string({
    required_error: "Confirm password is required",
  }),
});

export default function PasswordReset() {
  const params = useParams<Record<string, string | undefined>>();
  const [error_message, set_error_message] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hash: params.hash || "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    set_error_message("");
  };

  return (
    <Card className="overflow-hidden max-w-md mx-auto">
      <CardContent className="p-1">
        <Form {...form}>
          <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Reset your password</h1>
                <p className="text-sm text-muted-foreground mt-3">
                  Enter your new password below to reset your password.
                </p>
              </div>
              {error_message && (
                <Alert variant="destructive" className="mt-5">
                  <AlertDescription>
                    {error_message || "An error occurred"}
                  </AlertDescription>
                </Alert>
              )}
              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input placeholder="new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input placeholder="confirm password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Continue <Spinner isLoading={false} />
              </Button>
              <Link
                to="/auth/login"
                className="text-primary text-center flex justify-center items-center font-medium hover:underline group"
              >
                <ArrowLeft
                  className="mr-2 transform transition-transform duration-300 group-hover:-translate-x-1"
                  size={16}
                />
                Back to login
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
