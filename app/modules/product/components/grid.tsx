import type { Product } from "../type";

export function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <ul>
      {products.map((product: any) => {
        return <li key={product.id}>{product.name}</li>;
      })}
    </ul>
  );
}
