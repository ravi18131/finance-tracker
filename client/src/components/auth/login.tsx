import { z } from "zod";
import React from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "@/store/session.store";
import { useMutation } from "@tanstack/react-query";
import fetchApi from "@/lib/axios";
import Spinner from "../ui/spinner";
import { Card, CardContent } from "../ui/card";

const FormSchema = z.object({
  email: z.string({ required_error: "Email is required" }).refine(
    (value) => {
      return value.includes("@");
    },
    { message: "Invalid email address" }
  ),
  password: z.string({ required_error: "Password is required" }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useSession();

  const [error_message, set_error_message] = React.useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  const mutation = useMutation({
    mutationFn: (data: FormValues) => {
      return fetchApi.post(`/auth/login`, data);
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  const mutate = (data: FormValues) => {
    set_error_message("");
    mutation.mutate(data, {
      onSuccess: ({ data }) => {
        console.log(data);

        if (data.success && data.data && data.data.access_token) {
          setUser(data.data.user);
          localStorage.setItem("access_token", data.data.access_token);
          navigate("/admin");
        }

        if (!data.success) {
          set_error_message(data.message);
        }
      },
      onError: (error) => {
        console.log("error", error);
        set_error_message(error.message);
      },
    });
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="grid p-0 md:grid-cols-2">
        <Form {...form}>
          <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Acme Inc account
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
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="flex items-center justify-between">
                      Password{" "}
                      <Link
                        to="/auth/forgot-password"
                        className="text-primary font-semibold hover:underline"
                      >
                        Forgot your password?
                      </Link>
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
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <Button variant="outline" className="w-full" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Login with Google
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </Form>
        <div className="relative hidden bg-muted md:block">
          <img
            src="/images/login_side_img.svg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-fill p-5 dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </CardContent>
    </Card>
  );
}
