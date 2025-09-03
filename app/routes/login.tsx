import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import type { Route } from "./+types/login";
import { Form, redirect } from "react-router";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { commitSession, getSession } from "~/sessions";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }];
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("token")) {
    return redirect("/dashboard");
  }

  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  const loginBody = {
    email,
    password,
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginBody),
    }
  );
  const token = await response.json();

  session.set("token", token);

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function LoginRoute({}: Route.ComponentProps) {
  return (
    <div className=" flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardTitle className="text-center text-2xl font-bold text-gray-900">
            Login
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Continue to your account
          </CardDescription>

          <Form method="POST" className="space-y-4 p-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              // disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {/* {isSubmitting ? "Creating Account..." : "Create Account"} */}
              Login
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}
