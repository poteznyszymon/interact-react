import { createFileRoute, redirect } from "@tanstack/react-router";

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
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-2xl font-semibold">Home</h1>
    </div>
  );
}
