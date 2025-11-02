import LoadingButton from "@/components/LoadingButton";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema } from "@/schemas/forgot-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import type z from "zod";

export const Route = createFileRoute("/(auth)/_auth/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: z.infer<typeof forgotPasswordSchema>) => {
    console.log(values);
    sessionStorage.setItem("resetEmail", values.email);
    navigate({ to: "/verify-otp", state: { email: values.email } as any });
  };

  const navigate = useNavigate({ from: "/forgot-password" });

  return (
    <Card className="z-10 flex h-full w-full flex-col items-stretch justify-center gap-4 p-8 sm:h-fit sm:max-w-[24rem]">
      <Link
        to={"/login"}
        className="flex w-fit items-center gap-1 text-sm hover:underline"
      >
        <ArrowLeft size={16} />
        <p>Back to login</p>
      </Link>
      <div className="flex flex-col gap-1">
        <h3 className="text-[1.3rem] font-semibold tracking-tight text-balance">
          Forgot Password?
        </h3>
        <p className="text-muted-foreground text-xs">
          Enter your email address and we'll send you a code to reset your
          password
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton loading={false}>Send reset code</LoadingButton>
        </form>
      </Form>
    </Card>
  );
}
