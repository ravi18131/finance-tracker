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
import { Link } from "react-router-dom";

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

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <>
      <h3 className="text-md text-center font-medium mt-1 mb-10">
        Forget your password?
      </h3>

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
          <div className="!mt-6 text-center">
            <Button type="submit" className="w-full">
              Send password reset link
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
