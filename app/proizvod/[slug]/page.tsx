import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product-gallery";
import { ProductInfo } from "@/components/product-info";
import { ProductTabs } from "@/components/product-tabs";
import { RelatedProducts } from "@/components/related-products";
import { ProductBreadcrumb } from "@/components/product-breadcrumb";

// Mock data - replace with actual database queries
const products = {
  "personalizirani-privjesak": {
    id: "1",
    name: "Personalizirani Privjesak",
    slug: "personalizirani-privjesak",
    price: 25.99,
    originalPrice: 35.99,
    rating: 4.8,
    reviews: 124,
    images: [
      "/engraved-pendant.png",
      "/pendant-detail.png",
      "/pendant-materials.png",
      "/pendant-sizes.png",
    ],
    category: "Graviranje",
    categorySlug: "graviranje",
    badge: "Bestseller",
    description:
      "Elegantan privjesak s vašim osobnim graviranjem. Savršen poklon za posebne prilike.",
    longDescription: `
      Naš personalizirani privjesak je izrađen od najkvalitetnijih materijala i precizno graviran 
      najnovijom laser tehnologijom. Možete odabrati između različitih materijala i veličina, 
      te dodati vlastiti tekst, datum ili simbol.
      
      Svaki privjesak dolazi u elegantnoj poklon kutiji, što ga čini savršenim poklonom za 
      rođendane, godišnjice, vjenčanja ili bilo koju drugu posebnu priliku.
    `,
    materials: [
      { name: "Nehrđajući čelik", price: 0, image: "/material-steel.png" },
      { name: "Srebro", price: 15, image: "/material-silver.png" },
      { name: "Zlato", price: 45, image: "/material-gold.png" },
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
      Materijal: "Nehrđajući čelik / Srebro / Zlato",
      Dimenzije: "20x15mm - 30x25mm",
      Težina: "5-15g",
      Graviranje: "Laser graviranje",
      Pakiranje: "Elegantna poklon kutija",
      Garancija: "2 godine",
    },
    shipping: {
      standard: { days: "5-7", price: 15 },
      express: { days: "2-3", price: 25 },
      free: { minOrder: 100 },
    },
    inStock: true,
    stockCount: 15,
  },
  "cnc-drvena-kutija": {
    id: "4",
    name: "CNC Drvena Kutija",
    slug: "cnc-drvena-kutija",
    price: 89.99,
    rating: 4.9,
    reviews: 67,
    images: [
      "/cnc-wooden-box.png",
      "/wooden-box-open.png",
      "/wooden-box-detail.png",
      "/wooden-box-materials.png",
    ],
    category: "CNC Obrada",
    categorySlug: "cnc",
    badge: "Popularan",
    description:
      "Precizno izrađena drvena kutija s CNC tehnologijom. Idealna za čuvanje dragocjenosti.",
    longDescription: `
      Naša CNC drvena kutija je remek-djelo preciznosti i zanatstva. Izrađena od najkvalitetnijih 
      vrsta drva, svaka kutija prolazi kroz pažljiv proces CNC obrade koji osigurava savršene 
      dimenzije i glatku površinu.
      
      Kutija može biti personalizirana s vašim imenom, logotipom ili posebnim dizajnom. 
      Savršena je za čuvanje nakita, satova, dokumenata ili bilo čega što vam je dragocjeno.
    `,
    materials: [
      { name: "Hrast", price: 0, image: "/wood-oak.png" },
      { name: "Bukva", price: 10, image: "/wood-beech.png" },
      { name: "Orah", price: 25, image: "/wood-walnut.png" },
    ],
    sizes: [
      { name: "Mala", dimensions: "15x10x5cm", price: 0 },
      { name: "Srednja", dimensions: "20x15x8cm", price: 15 },
      { name: "Velika", dimensions: "25x20x10cm", price: 30 },
    ],
    customization: {
      engraving: true,
      logo: true,
      interior: ["Baršun", "Svila", "Kožа"],
    },
    specifications: {
      Materijal: "Masivno drvo",
      Obrada: "CNC precizna obrada",
      "Završna obrada": "Prirodni vosak",
      Brava: "Metalna s ključem",
      Unutrašnjost: "Baršunasta podstava",
      Garancija: "5 godina",
    },
    shipping: {
      standard: { days: "7-10", price: 20 },
      express: { days: "3-5", price: 35 },
      free: { minOrder: 150 },
    },
    inStock: true,
    stockCount: 8,
  },
};

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products[slug as keyof typeof products];

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <ProductBreadcrumb
          category={product.category}
          categorySlug={product.categorySlug}
          productName={product.name}
        />

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <ProductInfo product={product} />
        </div>

        {/* Product Details Tabs */}
        <ProductTabs product={product} />

        {/* Related Products */}
        <RelatedProducts
          currentProduct={product}
          category={product.categorySlug}
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
  const product = products[slug as keyof typeof products];

  if (!product) {
    return {
      title: "Proizvod nije pronađen",
    };
  }

  return {
    title: `${product.name} - Vlado Webshop`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export function generateStaticParams() {
  return [
    { slug: "personalizirani-privjesak" },
    { slug: "cnc-drvena-kutija" },
    { slug: "3d-figurica-po-fotografiji" },
    { slug: "svadbeni-prsteni-drzac" },
  ];
}
