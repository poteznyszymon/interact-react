import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { loginSchema } from "@/schemas/login-schema";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";
import { useState } from "react";
import SocialAuthButton from "@/components/SocialAuthButton";

export const Route = createFileRoute("/(auth)/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
    setIsLoading(true);
  };

  return (
    <Card className="flex flex-col items-stretch justify-center p-8 gap-4 w-full h-full sm:max-w-[25rem] sm:h-fit">
      <div className="flex flex-col gap-1">
        <h3 className="text-[1.3rem] font-semibold tracking-tight text-balance">
          Login to your account
        </h3>
        <p className="text-xs text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <SocialAuthButton />
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton loading={isLoading}>Login</LoadingButton>
        </form>
      </Form>
      <div className="text-xs text-center">
        <span className="text-muted-foreground">Don't have an account?</span>
        <Link to="/register" className="hover:underline">
          Sign In
        </Link>
      </div>
    </Card>
  );
}
