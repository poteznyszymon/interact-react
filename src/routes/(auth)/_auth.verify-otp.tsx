import LoadingButton from "@/components/LoadingButton";
import { Card } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  createFileRoute,
  Link,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/(auth)/_auth/verify-otp")({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  const email =
    (location.state as any)?.email ||
    sessionStorage.getItem("resetEmail") ||
    "";
  const navigate = useNavigate();

  function maskEmail(email: string) {
    const [user, domain] = email.split("@");
    if (user.length <= 4) return email;
    return `${user.slice(0, 2)}***${user.slice(-2)}@${domain}`;
  }

  useEffect(() => {
    if (!email) {
      navigate({ to: "/login" });
    }
  }, [email, navigate]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("resetEmail");
    };
  }, []);

  return (
    <Card className="z-10 flex h-full w-full flex-col justify-center gap-4 p-8 sm:h-fit sm:max-w-[23rem]">
      <Link
        to={"/forgot-password"}
        className="flex w-fit items-center gap-1 text-sm hover:underline"
      >
        <ArrowLeft size={16} />
        <p>Back</p>
      </Link>
      <div className="flex w-full flex-col text-start">
        <h3 className="text-[1.3rem] font-semibold tracking-tight text-balance">
          Enter the code
        </h3>
        <p className="text-muted-foreground text-xs">
          We've sent a 6-digit code to {maskEmail(email)}
        </p>
      </div>
      <InputOTP maxLength={6}>
        <InputOTPGroup className="flex w-full">
          <InputOTPSlot index={0} className="flex-1" />
          <InputOTPSlot index={1} className="flex-1" />
          <InputOTPSlot index={2} className="flex-1" />
          <InputOTPSlot index={3} className="flex-1" />
          <InputOTPSlot index={4} className="flex-1" />
          <InputOTPSlot index={5} className="flex-1" />
        </InputOTPGroup>
      </InputOTP>
      <LoadingButton loading={false}>Verify code</LoadingButton>
    </Card>
  );
}
