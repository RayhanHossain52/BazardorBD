
import CategoryProducts from "@/app/components/CategoryProducts";
import { Product } from "@/types/productTyp";
import { notFound } from "next/navigation";


const CategoryPage = async ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = await params;
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products/");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  const categoryProducts = products.filter(
    (product) => product.category === id
  );

  if (categoryProducts.length === 0) {
    notFound();
  }

  return (
     <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 text-[#202923] sm:px-6">
      <div className="mx-auto max-w-6xl">
        <CategoryProducts products={categoryProducts} />
      </div>
    </main>
  );
};

export default CategoryPage;