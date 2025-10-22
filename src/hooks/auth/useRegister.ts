import type { RegisterCredentials } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

const useRegister = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const data = await response.json();
        const message = data?.detail || "Something went wrong.";
        throw new Error(message);
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("User created successfully");
      navigate({ to: "/" });
    },
    onError: (error: any) => {
      toast.warning(error?.message || "Something went wrong");
    },
  });

  return { mutate, isPending };
};

export default useRegister;
