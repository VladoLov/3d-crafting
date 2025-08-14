import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product-gallery";
import { ProductInfo } from "@/components/product-info";
import { ProductTabs } from "@/components/product-tabs";
import { RelatedProducts } from "@/components/related-products";
import { ProductBreadcrumb } from "@/components/product-breadcrumb";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProduct(slug: string) {
  try {
    const response = await fetch(
      `${
        process.env.NEXTAUTH_URL || "http://localhost:3000"
      }/api/products/${slug}`,
      {
        cache: "no-store", // Ensure fresh data
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const transformedProduct = {
    ...product,
    rating: 4.8, // Mock rating for now
    reviews: Math.floor(Math.random() * 200) + 50, // Mock reviews
    originalPrice: product.price * 1.2, // Mock original price
    badge: "Popularan",
    longDescription:
      product.description ||
      `Detaljni opis proizvoda ${product.name}. Ovaj proizvod je izrađen s najvećom pažnjom i kvalitetom.`,
    materials: [
      { name: "Standard", price: 0, image: "/material-standard.jpg" },
      { name: "Premium", price: 15, image: "/material-premium.jpg" },
    ],
    sizes: [
      { name: "S", dimensions: "20x15mm", price: 0 },
      { name: "M", dimensions: "25x20mm", price: 5 },
      { name: "L", dimensions: "30x25mm", price: 10 },
    ],
    customization: {
      maxChars: 50,
      fonts: ["Arial", "Times New Roman", "Script"],
      symbols: ["❤️", "⭐", "🌟", "💎", "🎵"],
    },
    specifications: {
      Kategorija: product.category.name,
      Materijal: "Visokokvalitetni materijal",
      Dimenzije: "Prilagodljive",
      Garancija: "2 godine",
    },
    shipping: {
      standard: { days: "5-7", price: 15 },
      express: { days: "2-3", price: 25 },
      free: { minOrder: 100 },
    },
    inStock: product.isActive,
    stockCount: 15,
    categorySlug: product.category.slug,
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <ProductBreadcrumb
          category={product.category.name}
          categorySlug={product.category.slug}
          productName={product.name}
        />

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <ProductInfo product={transformedProduct} />
        </div>

        {/* Product Details Tabs */}
        <ProductTabs product={transformedProduct} />

        {/* Related Products */}
        <RelatedProducts
          currentProduct={transformedProduct}
          category={product.category.slug}
        />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Proizvod nije pronađen",
    };
  }

  return {
    title: `${product.name} - Vlado Webshop`,
    description:
      product.description || `${product.name} - ${product.category.name}`,
    openGraph: {
      title: product.name,
      description:
        product.description || `${product.name} - ${product.category.name}`,
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}
