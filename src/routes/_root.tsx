import { createFileRoute } from "@tanstack/react-router";
import "./index.css";
import InDevelopment from "@/components/InDevelopment";

export const Route = createFileRoute("/_root")({
  // loader: async () => {
  //   const response = await fetch("/api/auth/current");

  //   if (response.status === 401) {
  //     throw redirect({ to: "/login" });
  //   }

  //   const user = (await response.json()) as User;
  //   return { user };
  // },
  component: RouteComponent,
});

function RouteComponent() {
  // const { user } = Route.useLoaderData();

  return (
    <main className="test flex h-screen">
      <InDevelopment />
      {/* <SideBar user={user} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`w-full transition-[margin] duration-300 ${isOpen ? "ml-[18rem]" : "ml-0"}`}
      >
        <Outlet />
      </div> */}
    </main>
  );
}
