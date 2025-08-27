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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "@/store/session.store";
import { useMutation } from "@tanstack/react-query";
import fetchApi from "@/lib/axios";
import Spinner from "../ui/spinner";
import { Card, CardContent } from "../ui/card";
import { toast } from "sonner";

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
    mutation.mutate(data, {
      onSuccess: ({ data }) => {
        console.log(data);

        if (data.success && data.data && data.data.access_token) {
          toast.success(data.message || "Sign Up successful!!");
          setUser(data.data.user);
          localStorage.setItem("access_token", data.data.access_token);
          navigate("/admin");
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
      <CardContent className="grid p-0 md:grid-cols-2">
        <Form {...form}>
          <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your finance tracker account
                </p>
              </div>
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

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/auth/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </Form>
        <div className="md:flex flex-1 justify-center items-center hidden bg-muted">
          <img
            src="/images/login_side_img.png"
            alt="Image"
            className=" h-auto w-full object-fill p-5 dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </CardContent>
    </Card>
  );
}
