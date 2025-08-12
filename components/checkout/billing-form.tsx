"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCheckoutStore } from "@/lib/store/checkout-store";
import { BillingAddress } from "@/lib/types/checkout";

const billingSchema = z
  .object({
    sameAsShipping: z.boolean(),
    firstName: z.string().min(2, "Ime mora imati najmanje 2 znaka").optional(),
    lastName: z
      .string()
      .min(2, "Prezime mora imati najmanje 2 znaka")
      .optional(),
    email: z.string().email("Unesite valjanu email adresu").optional(),
    phone: z.string().min(8, "Unesite valjan broj telefona").optional(),
    company: z.string().optional(),
    address: z.string().min(5, "Unesite valjanu adresu").optional(),
    city: z.string().min(2, "Unesite valjan grad").optional(),
    postalCode: z.string().min(4, "Unesite valjan poštanski broj").optional(),
    country: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.sameAsShipping) return true;
      return !!(
        data.firstName &&
        data.lastName &&
        data.email &&
        data.phone &&
        data.address &&
        data.city &&
        data.postalCode &&
        data.country
      );
    },
    {
      message:
        "Sva polja su obavezna ako adresa naplate nije ista kao adresa dostave",
    }
  );

const countries = [
  { value: "HR", label: "Hrvatska" },
  { value: "SI", label: "Slovenija" },
  { value: "BA", label: "Bosna i Hercegovina" },
  { value: "RS", label: "Srbija" },
  { value: "ME", label: "Crna Gora" },
  { value: "MK", label: "Sjeverna Makedonija" },
];

interface BillingFormProps {
  onNext: () => void;
  onBack: () => void;
}

export function BillingForm({ onNext, onBack }: BillingFormProps) {
  const { checkoutData, updateBilling } = useCheckoutStore();
  const [sameAsShipping, setSameAsShipping] = useState(
    checkoutData.billing?.sameAsShipping ?? true
  );

  const form = useForm<BillingAddress>({
    resolver: zodResolver(billingSchema),
    defaultValues: checkoutData.billing || {
      sameAsShipping: true,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      city: "",
      postalCode: "",
      country: "HR",
    },
  });

  const onSubmit = (data: BillingAddress) => {
    if (data.sameAsShipping && checkoutData.shipping) {
      // Copy shipping address to billing
      const billingData: BillingAddress = {
        ...checkoutData.shipping,
        sameAsShipping: true,
      };
      updateBilling(billingData);
    } else {
      updateBilling(data);
    }
    onNext();
  };

  const handleSameAsShippingChange = (checked: boolean) => {
    setSameAsShipping(checked);
    form.setValue("sameAsShipping", checked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Adresa naplate
      </h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Same as Shipping Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="sameAsShipping"
            checked={sameAsShipping}
            onCheckedChange={handleSameAsShippingChange}
          />
          <Label htmlFor="sameAsShipping" className="text-sm font-medium">
            Adresa naplate je ista kao adresa dostave
          </Label>
        </div>

        {!sameAsShipping && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6"
          >
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Ime *</Label>
                <Input
                  id="firstName"
                  {...form.register("firstName")}
                  className="mt-1"
                />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="lastName">Prezime *</Label>
                <Input
                  id="lastName"
                  {...form.register("lastName")}
                  className="mt-1"
                />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email adresa *</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  className="mt-1"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Telefon *</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...form.register("phone")}
                  className="mt-1"
                />
                {form.formState.errors.phone && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Company */}
            <div>
              <Label htmlFor="company">Tvrtka (opcionalno)</Label>
              <Input
                id="company"
                {...form.register("company")}
                className="mt-1"
              />
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address">Adresa *</Label>
              <Input
                id="address"
                {...form.register("address")}
                className="mt-1"
              />
              {form.formState.errors.address && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.address.message}
                </p>
              )}
            </div>

            {/* City, Postal Code, Country */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">Grad *</Label>
                <Input id="city" {...form.register("city")} className="mt-1" />
                {form.formState.errors.city && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="postalCode">Poštanski broj *</Label>
                <Input
                  id="postalCode"
                  {...form.register("postalCode")}
                  className="mt-1"
                />
                {form.formState.errors.postalCode && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.postalCode.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="country">Zemlja *</Label>
                <Select
                  value={form.watch("country")}
                  onValueChange={(value) => form.setValue("country", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Odaberite zemlju" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.country && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.country.message}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onBack}>
            Nazad
          </Button>
          <Button type="submit" size="lg">
            Nastavi na plaćanje
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
