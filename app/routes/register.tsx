import type { Route } from "./+types/register";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Register" }];
}

export default function RegisterRoute({}: Route.ComponentProps) {
  return (
    <div>
      <h1>Register</h1>
    </div>
  );
}
