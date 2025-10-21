import type { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const useCurrentUser = () => {
  const { data, isLoading, error } = useQuery<User | null>({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await fetch("/api/auth/current");

      if (response.status === 401) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch current user: ${response.statusText}`);
      }

      return await response.json();
    },
  });

  return { user: data, isLoading, error };
};

export default useCurrentUser;
