import type { Product } from "~/modules/product/type";
import type { Route } from "./+types/products-slug";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { destroySession, getSession } from "~/sessions";
import { Form, redirect } from "react-router";
import type { AddCartItem } from "~/modules/cart/schema";

export function meta({}: Route.MetaArgs) {
  return [{ title: "(Product Name) of Flozka" }];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  try {
    console.log("Loading product with slug:", params.slug);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/products/${params.slug}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const product: Product = await response.json();
    return { product };
  } catch (error) {
    console.error("Error loading product:", error);
    throw error;
  }
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  if (!session.has("token")) {
    return redirect("/login");
  }

  const formData = await request.formData();

  const addCartItemData: AddCartItem = {
    productId: String(formData.get("productId")),
    quantity: Number(formData.get("quantity")),
  };

  const response = await fetch(
    `${process.env.VITE_BACKEND_API_URL}/cart/items`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(addCartItemData),
    }
  );

  if (!response.ok) {
    session.flash("error", "Failed to add item to cart");
    return redirect("/login", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }

  return redirect("/cart");
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // const handleAddToCart = () => {
  //   // TODO: Implement add to cart functionality
  //   console.log(`Adding ${quantity} of ${product.name} to cart`);
  // };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <a href="/" className="hover:text-emerald-900 transition-colors">
                Home
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <a
                href="/products"
                className="hover:text-emerald-900 transition-colors"
              >
                Products
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-emerald-900 font-bold ">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative group">
              {product.imageUrl && product.imageUrl.trim() !== "" ? (
                <div className="relative aspect-square w-full overflow-hidden bg-muted rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              ) : (
                <div className="w-full aspect-square bg-gray-200 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-500 text-lg mb-2">
                      No image available
                    </p>
                    <p className="text-gray-400 text-sm">
                      Image URL: {product.imageUrl || "undefined"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Product Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 hover:bg-green-200"
              >
                Fresh Flowers
              </Badge>
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 hover:bg-blue-200"
              >
                Premium Quality
              </Badge>
            </div>
          </div>

          {/* Product Info & Add to Cart */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="text-3xl font-bold text-emerald-900/90 mb-4">
                {formatPrice(product.price)}
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Add to Cart Form */}
            <Card className="border-green-200 bg-white/50">
              <Form method="POST">
                <input
                  type="hidden"
                  name="productId"
                  defaultValue={product.id}
                />
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-800">
                    Add to Cart
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Quantity Controls */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="quantity"
                      className="text-gray-700 font-medium"
                    >
                      Quantity
                    </Label>
                    <div className="flex items-center space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="w-10 h-10 rounded-full border-green-300 hover:border-green-500 hover:bg-green-50"
                      >
                        -
                      </Button>
                      <Input
                        name="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                          handleQuantityChange(parseInt(e.target.value) || 1)
                        }
                        min="1"
                        className="w-20 text-center border-green-300 focus:border-green-500 focus:ring-green-500"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="w-10 h-10 rounded-full border-green-300 hover:border-green-500 hover:bg-green-50"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* 
                // Total Price
                <div className="flex justify-between items-center py-3 px-4 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-gray-700 font-medium">
                    Subtotal:
                  </span>
                  <span className="text-2xl font-bold text-emerald-900/90">
                  {formatPrice(product.price * quantity)}
                  </span>
                  </div> 
                  */}

                  {/* Add to Cart Button */}
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                      />
                    </svg>
                    Add to Cart
                  </Button>
                </CardContent>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
