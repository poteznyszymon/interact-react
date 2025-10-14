import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-2xl font-semibold">Home</h1>
    </div>
  );
}
