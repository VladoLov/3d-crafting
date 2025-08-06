import { Hero } from "@/components/hero";
import { Categories } from "@/components/categories";
import { FeaturedProducts } from "@/components/featured-products";
import { About } from "@/components/about";

export default function HomePage() {
  return (
    <main className="space-y-12 ">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <About />
    </main>
  );
}
