import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }];
}

export default function LoginRoute({}: Route.ComponentProps) {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}
