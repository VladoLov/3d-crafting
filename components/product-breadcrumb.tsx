"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface ProductBreadcrumbProps {
  category: string;
  categorySlug: string;
  productName: string;
}

export function ProductBreadcrumb({
  category,
  categorySlug,
  productName,
}: ProductBreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
      <Link
        href="/"
        className="flex items-center hover:text-primary-600 transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link
        href={`/kategorije/${categorySlug}`}
        className="hover:text-primary-600 transition-colors"
      >
        {category}
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-gray-900 font-medium truncate max-w-xs">
        {productName}
      </span>
    </nav>
  );
}
