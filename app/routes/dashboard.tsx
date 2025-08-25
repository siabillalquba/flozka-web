import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export default function DashboardRoute({}: Route.ComponentProps) {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
