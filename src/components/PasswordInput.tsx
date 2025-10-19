import { useState } from "react";
import { Input } from "./ui/input";
import { Lock, LockOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends React.ComponentProps<"input"> {
  className?: string;
}

const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <div className="relative">
      <Input
        className={cn(className, "pr-8")}
        {...props}
        type={hidePassword ? "password" : "text"}
      >
        {props.children}
      </Input>
      <button
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-secondary p-1 rounded-[50%] text-muted-foreground hover:text-primary"
        onClick={(event) => {
          event.preventDefault();
          setHidePassword(!hidePassword);
        }}
      >
        {hidePassword ? <LockOpen size={12} /> : <Lock size={12} />}
      </button>
    </div>
  );
};

export default PasswordInput;
