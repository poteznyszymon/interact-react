import { createFileRoute, redirect } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/auth/useLogout";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const response = await fetch("/api/auth/current");

    if (response.status === 401) {
      throw redirect({ to: "/login" });
    }
  },
  //pendingComponent: () => <div>loading</div>,
  component: App,
});

function App() {
  const { mutate, isPending } = useLogout();

  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-2xl font-semibold">
        <Button onClick={() => mutate()} disabled={isPending}>
          Logout
        </Button>
      </h1>
    </div>
  );
}
