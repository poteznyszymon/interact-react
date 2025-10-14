import { Card } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Card></Card>;
}
