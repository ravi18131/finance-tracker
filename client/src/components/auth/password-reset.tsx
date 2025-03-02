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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link, useParams } from "react-router-dom";

const FormSchema = z.object({
  hash: z.string({ required_error: "Hash is required" }),
  new_password: z.string({ required_error: "New password is required" }),
  confirm_password: z.string({
    required_error: "Confirm password is required",
  }),
});

export default function PasswordReset() {
  const params = useParams<Record<string, string | undefined>>();

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
  };

  return (
    <>
      <h3 className="text-md text-center font-medium mt-1 mb-10">
        Reset your password
      </h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-1"
        >
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
          <div className="!mt-6 text-center">
            <Button type="submit" className="w-full">
              Reset password
            </Button>
          </div>
        </form>
      </Form>
      <div className="text-sm text-center mt-6">
        <Link
          to="/auth/login"
          className="text-primary font-semibold hover:underline"
        >
          Back to login
        </Link>
      </div>
    </>
  );
}
