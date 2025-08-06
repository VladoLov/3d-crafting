import { notFound } from "next/navigation";
import { CategoryHeader } from "@/components/category-header";
import { ProductGrid } from "@/components/product-grid";
import { CategoryFilters } from "@/components/category-filters";

// Mock data - replace with actual database queries
const categories = {
  graviranje: {
    id: "graviranje",
    name: "Graviranje",
    description:
      "Precizno graviranje na metal, drvo, staklo i druge materijale. Personalizirajte svoje proizvode s našim naprednim laser tehnologijama.",
    image: "/laser-engraving-workshop.png",
    products: [
      {
        id: "1",
        name: "Personalizirani Privjesak",
        slug: "personalizirani-privjesak",
        price: 25.99,
        originalPrice: 35.99,
        rating: 4.8,
        reviews: 124,
        images: ["/engraved-pendant.png", "/pendant-detail.png"],
        category: "Graviranje",
        badge: "Bestseller",
        description: "Elegantan privjesak s vašim osobnim graviranjem",
        materials: ["Nehrđajući čelik", "Srebro", "Zlato"],
        sizes: ["S", "M", "L"],
      },
      {
        id: "2",
        name: "Gravirana Plaketa",
        slug: "gravirana-plaketa",
        price: 45.99,
        rating: 4.9,
        reviews: 89,
        images: ["/engraved-plaque.png"],
        category: "Graviranje",
        badge: "Novo",
        description: "Profesionalna plaketa za nagrade i priznanja",
        materials: ["Aluminij", "Mesing", "Drvo"],
        sizes: ["10x15cm", "15x20cm", "20x25cm"],
      },
      {
        id: "3",
        name: "Gravirana Čaša",
        slug: "gravirana-casa",
        price: 18.99,
        rating: 4.7,
        reviews: 156,
        images: ["/engraved-glass.png"],
        category: "Graviranje",
        description: "Elegantna čaša s personalnim graviranjem",
        materials: ["Staklo", "Kristal"],
        sizes: ["250ml", "350ml", "500ml"],
      },
    ],
  },
  cnc: {
    id: "cnc",
    name: "CNC Obrada",
    description:
      "Profesionalna CNC obrada za složene i precizne dijelove. Izradimo sve od prototipova do finalnih proizvoda.",
    image: "/cnc-workshop-precision.png",
    products: [
      {
        id: "4",
        name: "CNC Drvena Kutija",
        slug: "cnc-drvena-kutija",
        price: 89.99,
        rating: 4.9,
        reviews: 67,
        images: ["/cnc-wooden-box.png"],
        category: "CNC Obrada",
        badge: "Popularan",
        description: "Precizno izrađena drvena kutija s CNC tehnologijom",
        materials: ["Hrast", "Bukva", "Orah"],
        sizes: ["Mala", "Srednja", "Velika"],
      },
      {
        id: "5",
        name: "Metalni Dijelovi",
        slug: "metalni-dijelovi",
        price: 125.99,
        rating: 4.8,
        reviews: 43,
        images: ["/cnc-metal-parts.png"],
        category: "CNC Obrada",
        description: "Precizni metalni dijelovi po vašim specifikacijama",
        materials: ["Aluminij", "Čelik", "Mesing"],
        sizes: ["Custom"],
      },
    ],
  },
  "3d-print": {
    id: "3d-print",
    name: "3D Print",
    description:
      "Inovativni 3D print za prototipove i finalne proizvode. Od ideje do stvarnosti u rekordnom vremenu.",
    image: "/3d-printer-creation.png",
    products: [
      {
        id: "6",
        name: "3D Figurica po Fotografiji",
        slug: "3d-figurica-po-fotografiji",
        price: 149.99,
        rating: 4.7,
        reviews: 89,
        images: ["/custom-3d-figurine.png"],
        category: "3D Print",
        badge: "Bestseller",
        description:
          "Personalizirana 3D figurica kreirana po vašoj fotografiji",
        materials: ["PLA", "ABS", "PETG"],
        sizes: ["10cm", "15cm", "20cm"],
      },
      {
        id: "7",
        name: "3D Prototip",
        slug: "3d-prototip",
        price: 75.99,
        rating: 4.6,
        reviews: 34,
        images: ["/3d-prototype.png"],
        category: "3D Print",
        description: "Brzi prototip za testiranje vaših ideja",
        materials: ["PLA", "ABS", "TPU"],
        sizes: ["Custom"],
      },
    ],
  },
  svadbe: {
    id: "svadbe",
    name: "Svadbeni Proizvodi",
    description:
      "Personalizirani svadbeni detalji za vaš poseban dan. Stvorite nezaboravne uspomene s našim jedinstvenim proizvodima.",
    image: "/elegant-wedding-setup.png",
    products: [
      {
        id: "8",
        name: "Svadbeni Prsteni Držač",
        slug: "svadbeni-prsteni-drzac",
        price: 45.99,
        rating: 5.0,
        reviews: 156,
        images: ["/wedding-ring-holder.png"],
        category: "Svadbe",
        badge: "Top Rated",
        description: "Elegantan držač za svadbene prstene",
        materials: ["Drvo", "Mramor", "Metal"],
        sizes: ["Standard"],
      },
      {
        id: "9",
        name: "Svadbene Pozivnice",
        slug: "svadbene-pozivnice",
        price: 2.99,
        rating: 4.8,
        reviews: 234,
        images: ["/wedding-invitations.png"],
        category: "Svadbe",
        description: "Personalizirane svadbene pozivnice s graviranjem",
        materials: ["Papir", "Karton", "Drvo"],
        sizes: ["A5", "A6", "Custom"],
      },
    ],
  },
};

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    sort?: string;
    filter?: string;
    price?: string;
    material?: string;
  };
}

export default function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const category = categories[params.slug as keyof typeof categories];

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryHeader category={category} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <CategoryFilters category={category} searchParams={searchParams} />
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <ProductGrid
              products={category.products}
              searchParams={searchParams}
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
    { slug: "cnc" },
    { slug: "3d-print" },
    { slug: "svadbe" },
  ];
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const category = categories[params.slug as keyof typeof categories];

  if (!category) {
    return {
      title: "Kategorija nije pronađena",
    };
  }

  return {
    title: `${category.name} - Vlado Webshop`,
    description: category.description,
  };
}
