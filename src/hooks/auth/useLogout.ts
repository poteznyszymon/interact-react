import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

const useLogout = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      return true;
    },
    onSuccess: () => {
      navigate({ to: "/login" });
    },
  });

  return { mutate, isPending };
};

export default useLogout;
