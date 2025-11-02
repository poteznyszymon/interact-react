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
import SocialAuthButton from "@/components/SocialAuthButton";
import PasswordInput from "@/components/PasswordInput";
import useLogin from "@/hooks/auth/useLogin";

export const Route = createFileRoute("/(auth)/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate(values);
  };

  return (
    <Card className="z-10 flex h-full w-full flex-col items-stretch justify-center gap-4 p-8 sm:h-fit sm:max-w-[26rem]">
      <div className="flex flex-col gap-1">
        <h3 className="text-[1.3rem] font-semibold tracking-tight text-balance">
          Login to your account
        </h3>
        <p className="text-muted-foreground text-xs">
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
                  <PasswordInput
                    placeholder="Password"
                    {...field}
                  ></PasswordInput>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="-mt-1 mb-[10px] flex items-center justify-end">
            <Link to={"/forgot-password"} className="text-xs hover:underline">
              Forgot password
            </Link>
          </div>
          <LoadingButton loading={isPending}>Login</LoadingButton>
        </form>
      </Form>
      <div className="text-center text-xs">
        <span className="text-muted-foreground">Don't have an account?</span>{" "}
        <Link to="/register" className="hover:underline">
          Sign Up
        </Link>
      </div>
    </Card>
  );
}
