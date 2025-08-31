import type { Route } from "./+types/register";
import { useState } from "react";
import { Form } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Register" }];
}

export default function RegisterRoute({}: Route.ComponentProps) {
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     const formData = new FormData(e.currentTarget);
  //     const data = {
  //       fullName: formData.get("fullName") as string,
  //       email: formData.get("email") as string,
  //       password: formData.get("password") as string,
  //     };

  //     // TODO: Implement your registration API call here
  //     console.log("Form submitted with data:", data);

  //     // Simulate API call delay
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     // TODO: Handle successful registration (redirect, show success message, etc.)
  //     alert("Registration successful!");
  //   } catch (error) {
  //     console.error("Registration failed:", error);
  //     // TODO: Handle error (show error message, etc.)
  //     alert("Registration failed. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <div className=" flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardTitle className="text-center text-2xl font-bold text-gray-900">
            Create Account
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Join us today and start your journey
          </CardDescription>

          <Form method="post" className="space-y-4 p-4">
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-gray-700"
              >
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                required
                className="w-full"
              />
            </div>

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
              Create Account
            </Button>
          </Form>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
