import { Variants } from "framer-motion";
import { FC } from "react";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    image: string;
    href: string;
    icon: FC; // Koristimo FC za React funkcionalne komponente
    color: string;
    bgColor: string;
    textColor: string;
  };
  // 2. Dodajte 'variants' prop s tipom Variants
  variants: Variants;
}
