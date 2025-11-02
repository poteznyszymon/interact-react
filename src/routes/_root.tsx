import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import "./index.css";
import SideBar from "@/components/layout/SideBar";
import { useState } from "react";
import type { User } from "@/types/user";

export const Route = createFileRoute("/_root")({
  loader: async () => {
    const response = await fetch("/api/auth/current");

    if (response.status === 401) {
      throw redirect({ to: "/login" });
    }

    const user = (await response.json()) as User;
    return { user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = Route.useLoaderData();

  return (
    <main className="test flex h-screen">
      <SideBar user={user} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`w-full transition-[margin] duration-300 ${isOpen ? "ml-[18rem]" : "ml-0"}`}
      >
        <Outlet />
      </div>
    </main>
  );
}
