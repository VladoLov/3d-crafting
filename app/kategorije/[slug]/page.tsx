import { notFound } from "next/navigation";
import { CategoryHeader } from "@/components/category-header";
import { ProductGrid } from "@/components/product-grid";
import { CategoryFilters } from "@/components/category-filters";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  description: string | null;
  categoryId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  products: Product[];
}

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    sort?: string;
    filter?: string;
    price?: string;
    material?: string;
  }>;
}

async function getCategoryWithProducts(slug: string): Promise<Category | null> {
  try {
    const response = await fetch(
      `${
        process.env.NEXTAUTH_URL || "http://localhost:3000"
      }/api/categories/${slug}/products`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const category = await getCategoryWithProducts(slug);

  if (!category) {
    notFound();
  }

  const transformedCategory = {
    ...category,
    description: category.description ?? "",
    image: category.image ?? "",
    products: category.products.map((product) => ({
      ...product,
      description: product.description ?? "",
      price: Number(product.price),
      originalPrice: Number(product.price) * 1.2,
      rating: 4.5 + Math.random() * 0.5,
      reviews: Math.floor(Math.random() * 200) + 50,
      category: category.name,
      badge:
        Math.random() > 0.7
          ? "Bestseller"
          : Math.random() > 0.5
          ? "Novo"
          : undefined,
      materials: ["Metal", "Drvo", "Plastika"],
      sizes: ["S", "M", "L"],
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryHeader category={transformedCategory} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <CategoryFilters
              category={transformedCategory}
              searchParams={resolvedSearchParams}
            />
          </aside>

          <main className="flex-1">
            <ProductGrid
              products={transformedCategory.products}
              searchParams={resolvedSearchParams}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { slug: "graviranje" },
    { slug: "cnc-obrada" },
    { slug: "3d-print" },
    { slug: "svadbeni-proizvodi" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryWithProducts(slug);

  if (!category) {
    return {
      title: "Kategorija nije pronađena",
    };
  }

  return {
    title: `${category.name} - Vlado Webshop`,
    description:
      category.description ||
      `Otkrijte našu ${category.name} kolekciju s vrhunskim proizvodima.`,
  };
}
