import { createFileRoute, redirect } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/auth/useLogout";
import { useTheme } from "@/components/theme-provider";

export const Route = createFileRoute("/_root/")({
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
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-screen w-full flex items-center justify-center gap-4">
      <Button variant={"ghost"} size={"sm"} onClick={() => mutate()}>
        logout
      </Button>
      <Button
        size={"sm"}
        variant={"outline"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        Change theme
      </Button>
    </div>
  );
}
