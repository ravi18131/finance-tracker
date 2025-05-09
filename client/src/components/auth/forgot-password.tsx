import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const FormSchema = z.object({
  email: z.string({ required_error: "Email is required" }).refine(
    (value) => {
      return value.includes("@");
    },
    { message: "Invalid email address" }
  ),
});

export default function ForgetPassword() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });
  const [error_message, set_error_message] = useState("");
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
                <h1 className="text-2xl font-bold">Forget your password?</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email address to reset your password.
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
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      We will send you a password reset link to your email.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Send password reset link <Spinner isLoading={false} />
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
