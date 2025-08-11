import { ProductsGrid } from "~/modules/product/components/grid";
import type { Route } from "./+types/products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products of Flozka" },
    // { name: "description", content: "Florist Batam" },
  ];
}

export async function clientLoader() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/products`
  );
  const products = await response.json();
  return products;
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  return (
    <div>
      <ProductsGrid products={products} />
    </div>
  );
}
