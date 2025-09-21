import { destroySession, getSession } from "~/sessions";
import type { Route } from "./+types/cart";
import type { UserAuthMe } from "~/modules/user/type";
import { Card } from "~/components/ui/card";
import { redirect } from "react-router";
import type { Cart } from "~/modules/cart/schema";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Cart" }];
}

export async function loader({ request }: Route.ClientLoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  if (!session.has("token")) {
    return redirect("/login");
  }

  const response = await fetch(`${process.env.VITE_BACKEND_API_URL}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return redirect("/login", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }

  const cart: Cart = await response.json();
  return { cart };
}

export default function CartRoute({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </div>
  );
}
