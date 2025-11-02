import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

const NotFound = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center">
        <h3 className="animate-bounce text-4xl font-semibold">404</h3>
        <h3 className="text-2xl font-semibold">Page not found</h3>
        <p className="text-muted-foreground font text-sm tracking-tighter">
          The page you're looking for doesn't exist.
        </p>
      </div>
      <Link to={"/"}>
        <Button variant={"default"} size={"sm"}>
          Go home
        </Button>
      </Link>
    </main>
  );
};

export default NotFound;
