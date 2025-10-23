import { createFileRoute, Outlet } from "@tanstack/react-router";
import "./index.css";
import SideBar from "@/components/layout/SideBar";

export const Route = createFileRoute("/_root")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="h-screen flex">
      <SideBar />
      <Outlet />
    </main>
  );
}
