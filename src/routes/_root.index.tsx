import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/auth/useLogout";
import { useTheme } from "@/components/theme-provider";

export const Route = createFileRoute("/_root/")({
  component: App,
});

function App() {
  const { mutate } = useLogout();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex h-screen w-full items-center justify-center gap-4">
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
