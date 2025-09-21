import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import type { Route } from "./+types/logout";
import { Form, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import { destroySession, getSession } from "~/sessions";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Logout" }];
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export default function LogoutRoute({}: Route.ComponentProps) {
  return (
    <div className=" flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardTitle className="text-center text-2xl font-bold text-gray-900">
            Logout
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Logout from your account
          </CardDescription>

          <Form method="POST" className="space-y-4 p-4">
            <Button type="submit" className="w-full" size="lg">
              Logout
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}
