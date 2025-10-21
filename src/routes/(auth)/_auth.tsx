import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import "./auth.css";

export const Route = createFileRoute("/(auth)/_auth")({
  beforeLoad: async () => {
    const response = await fetch("/api/auth/current");

    if (response.status !== 401) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <main className="h-screen bg-background flex items-center justify-center">
      <Button
        size={"icon-sm"}
        variant={"secondary"}
        className="absolute top-6 right-6 overflow-hidden border"
        onClick={() => changeTheme()}
      >
        <div className="relative w-4 h-4 z-20">
          <Sun
            className={`absolute inset-0 transition-all duration-300 ${theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}
          />
          <Moon
            className={`absolute inset-0 transition-all duration-300 ${theme === "light" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`}
          />
        </div>
      </Button>
      <Outlet />
    </main>
  );
}
