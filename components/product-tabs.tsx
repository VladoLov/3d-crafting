"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, User } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface ProductTabsProps {
  product: any; // Replace with proper type
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: "Marija K.",
      rating: 5,
      date: "15.12.2023",
      comment:
        "Odličan proizvod! Graviranje je precizno i kvaliteta materijala je vrhunska. Preporučujem!",
      verified: true,
    },
    {
      id: 2,
      user: "Petar M.",
      rating: 4,
      date: "10.12.2023",
      comment:
        "Vrlo zadovoljan kupnjom. Dostava je bila brza i pakiranje odlično.",
      verified: true,
    },
    {
      id: 3,
      user: "Ana S.",
      rating: 5,
      date: "05.12.2023",
      comment:
        "Savršen poklon! Personalizacija je bila točno kako sam zamislila.",
      verified: true,
    },
  ];

  return (
    <div className="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="description">Opis</TabsTrigger>
            <TabsTrigger value="specifications">Specifikacije</TabsTrigger>
            <TabsTrigger value="shipping">Dostava</TabsTrigger>
            <TabsTrigger value="reviews">
              Recenzije ({product.reviews})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Detaljni opis
              </h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.longDescription}
                </p>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="specifications" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Specifikacije
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex flex-col space-y-1">
                    <dt className="text-sm font-medium text-gray-500">{key}</dt>
                    <dd className="text-gray-900">{value as string}</dd>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Dostava i plaćanje
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Opcije dostave
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium">Standardna dostava</div>
                        <div className="text-sm text-gray-600">
                          {product.shipping.standard.days} radnih dana
                        </div>
                      </div>
                      <div className="font-semibold">
                        {formatPrice(product.shipping.standard.price)}
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium">Brza dostava</div>
                        <div className="text-sm text-gray-600">
                          {product.shipping.express.days} radna dana
                        </div>
                      </div>
                      <div className="font-semibold">
                        {formatPrice(product.shipping.express.price)}
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 border border-primary-200 bg-primary-50 rounded-lg">
                      <div>
                        <div className="font-medium text-primary-700">
                          Besplatna dostava
                        </div>
                        <div className="text-sm text-primary-600">
                          Za narudžbe preko{" "}
                          {formatPrice(product.shipping.free.minOrder)}
                        </div>
                      </div>
                      <div className="font-semibold text-primary-700">
                        Besplatno
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Načini plaćanja
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Kartica", "PayPal", "Bankovna", "Gotovina"].map(
                      (method) => (
                        <div
                          key={method}
                          className="p-3 border border-gray-200 rounded-lg text-center text-sm"
                        >
                          {method}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Recenzije kupaca
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
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
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-gray-600">
                    ({product.reviews} recenzija)
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 pb-6 last:border-b-0"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium">{review.user}</span>
                          {review.verified && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                              Potvrđena kupnja
                            </span>
                          )}
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
