import type { Product } from "~/modules/product/type";
import type { Route } from "./+types/products-slug";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "(Product Name) of Flozka" },
    // { name: "description", content: "Florist Batam" },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/products/${params.slug}`
  );
  const product: Product = await response.json();
  return { product };
}

export default function HomeRoute({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.description}</p>
    </div>
  );
}
