import { Card } from "~/components/ui/card";
import type { Product } from "../type";
import { Link } from "react-router";

function formatPriceToIDR(value: number): string {
  try {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `Rp ${value.toLocaleString("id-ID")}`;
  }
}

export function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <ul className="mx-auto grid max-w-[900px] grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        return (
          <li key={product.id} className="list-none">
            <Link
              to={`/products/${product.slug}`}
              aria-label={product.name}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded-xl"
            >
              <Card className="p-0 overflow-hidden border-none shadow-none rounded-none">
                <div className="relative aspect-square w-full overflow-hidden bg-muted rounded-none">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                <div className="py-4 sm:px-5">
                  {/* Title */}
                  <h4 className="text-md font-semibold tracking-tight text-emerald-900/90">
                    {product.name}
                  </h4>
                  {/* Price */}
                  <p className="mt-2 text-sm text-muted-foreground">
                    {formatPriceToIDR(product.price)}
                  </p>
                </div>
              </Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
