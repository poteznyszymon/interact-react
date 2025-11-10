import { Construction, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";

const InDevelopment = () => {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="from-background via-background to-muted relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="bg-primary/5 absolute top-20 left-20 h-64 w-64 animate-pulse rounded-full blur-3xl"></div>
      <div
        className="bg-accent/5 absolute right-20 bottom-20 h-96 w-96 animate-pulse rounded-full blur-3xl"
        style={{ animationDelay: "1s" }}
      ></div>

      <Button
        size={"icon-sm"}
        variant={"secondary"}
        className="absolute top-6 right-6 overflow-hidden border"
        onClick={() => changeTheme()}
      >
        <div className="relative z-20 h-4 w-4">
          <Sun
            className={`absolute inset-0 transition-all duration-300 ${theme === "dark" ? "rotate-0 opacity-100" : "rotate-90 opacity-0"}`}
          />
          <Moon
            className={`absolute inset-0 transition-all duration-300 ${theme === "light" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
          />
        </div>
      </Button>

      <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">
        <div className="relative">
          <div className="bg-primary/20 absolute inset-0 animate-ping rounded-full"></div>
          <div className="border-border bg-card/50 relative rounded-full border p-6 shadow-lg backdrop-blur-sm">
            <Construction
              className="text-primary h-12 w-12"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-foreground text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
            Coming Soon
          </h1>
          <p className="text-muted-foreground mx-auto max-w-md text-lg sm:text-xl">
            Site under construction. Stay tuned.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InDevelopment;
