"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Plus,
  Minus,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";

interface ProductInfoProps {
  product: any; // Replace with proper type
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedMaterial, setSelectedMaterial] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const calculatePrice = () => {
    let price = product.price;
    if (product.materials?.[selectedMaterial]?.price) {
      price += product.materials[selectedMaterial].price;
    }
    if (product.sizes?.[selectedSize]?.price) {
      price += product.sizes[selectedSize].price;
    }
    return price * quantity;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant="secondary"
            className="bg-primary-100 text-primary-700"
          >
            {product.category}
          </Badge>
          {product.badge && (
            <Badge variant="default" className="bg-accent-500">
              {product.badge}
            </Badge>
          )}
        </div>

        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          {product.name}
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(product.rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {product.rating} ({product.reviews} recenzija)
        </span>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-gray-900">
            {formatPrice(calculatePrice())}
          </span>
          {product.originalPrice && (
            <span className="text-xl text-gray-500 line-through">
              {formatPrice(product.originalPrice * quantity)}
            </span>
          )}
        </div>
        {quantity > 1 && (
          <p className="text-sm text-gray-600">
            {formatPrice(calculatePrice() / quantity)} po komadu
          </p>
        )}
      </div>

      <Separator />

      {/* Material Selection */}
      {product.materials && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Materijal</h3>
          <div className="grid grid-cols-1 gap-3">
            {product.materials.map((material: any, index: number) => (
              <motion.button
                key={material.name}
                onClick={() => setSelectedMaterial(index)}
                className={`flex items-center justify-between p-3 border rounded-lg transition-all ${
                  selectedMaterial === index
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <span className="font-medium">{material.name}</span>
                </div>
                {material.price > 0 && (
                  <span className="text-sm text-gray-600">
                    +{formatPrice(material.price)}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Veličina</h3>
          <div className="grid grid-cols-3 gap-3">
            {product.sizes.map((size: any, index: number) => (
              <motion.button
                key={size.name}
                onClick={() => setSelectedSize(index)}
                className={`p-3 border rounded-lg text-center transition-all ${
                  selectedSize === index
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="font-medium">{size.name}</div>
                <div className="text-xs text-gray-600">{size.dimensions}</div>
                {size.price > 0 && (
                  <div className="text-xs text-primary-600">
                    +{formatPrice(size.price)}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Customization */}
      {product.customization && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Personalizacija</h3>
          <div className="space-y-3">
            <Textarea
              placeholder="Unesite tekst za graviranje..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              maxLength={product.customization.maxChars}
              className="resize-none"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Maksimalno {product.customization.maxChars} znakova</span>
              <span>
                {customText.length}/{product.customization.maxChars}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Količina</h3>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity >= product.stockCount}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600 ml-4">
            {product.stockCount} dostupno
          </span>
        </div>
      </div>

      <Separator />

      {/* Actions */}
      <div className="space-y-4">
        <AddToCartButton
          product={product}
          selectedMaterial={product.materials?.[selectedMaterial]}
          selectedSize={product.sizes?.[selectedSize]}
          quantity={quantity}
          customText={customText}
          disabled={!product.inStock}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3"
        />

        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className={`h-4 w-4 mr-2 ${
                isFavorite ? "fill-current text-red-500" : ""
              }`}
            />
            Favoriti
          </Button>
          <Button variant="outline" className="flex-1">
            <Share2 className="h-4 w-4 mr-2" />
            Podijeli
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 gap-4 pt-6 border-t">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Truck className="h-5 w-5 text-primary-500" />
          <span>
            Besplatna dostava za narudžbe preko{" "}
            {formatPrice(product.shipping.free.minOrder)}
          </span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Shield className="h-5 w-5 text-primary-500" />
          <span>Garancija kvalitete</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <RotateCcw className="h-5 w-5 text-primary-500" />
          <span>30 dana za povrat</span>
        </div>
      </div>
    </div>
  );
}
