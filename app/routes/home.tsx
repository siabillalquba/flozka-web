import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Flozka" },
    { name: "description", content: "Florist Batam" },
  ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const response = await fetch(`http://localhost:3000/products`);
  const products = await response.json();
  return products;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  return (
    <div>
      <h1>Flozka</h1>

      <ul>
        {products.map((product: any) => {
          return <li key={product.id}>{product.name}</li>;
        })}
      </ul>
    </div>
  );
}
