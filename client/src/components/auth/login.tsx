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
    <>
      <h3 className="text-md text-center font-medium mt-1 mb-10">
        Sign in to your account
      </h3>

      {error_message && (
        <Alert variant="destructive" className="my-5">
          <AlertDescription>
            {error_message || "An error occurred"}
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-1"
        >
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
              <FormItem className="space-y-1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="!mt-6 text-center">
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
      <div className="text-sm text-center mt-6">
        <Link
          to="/auth/forgot-password"
          className="text-primary font-semibold hover:underline"
        >
          Forgot your password?
        </Link>
      </div>
    </>
  );
}
