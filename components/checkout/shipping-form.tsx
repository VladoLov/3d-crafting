"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ShippingAddress } from "@/lib/types/checkout";
import { useCheckoutStore } from "@/lib/store/checkout-store";

const shippingSchema = z.object({
  firstName: z.string().min(2, "Ime mora imati najmanje 2 znaka"),
  lastName: z.string().min(2, "Prezime mora imati najmanje 2 znaka"),
  email: z.string().email("Unesite valjanu email adresu"),
  phone: z.string().min(8, "Unesite valjan broj telefona"),
  company: z.string().optional(),
  address: z.string().min(5, "Unesite valjanu adresu"),
  city: z.string().min(2, "Unesite valjan grad"),
  postalCode: z.string().min(4, "Unesite valjan poštanski broj"),
  country: z.string().min(1, "Odaberite zemlju"),
});

const countries = [
  { value: "HR", label: "Hrvatska" },
  { value: "SI", label: "Slovenija" },
  { value: "BA", label: "Bosna i Hercegovina" },
  { value: "RS", label: "Srbija" },
  { value: "ME", label: "Crna Gora" },
  { value: "MK", label: "Sjeverna Makedonija" },
];

interface ShippingFormProps {
  onNext: () => void;
}

export function ShippingForm({ onNext }: ShippingFormProps) {
  const { checkoutData, updateShipping } = useCheckoutStore();

  const form = useForm<ShippingAddress>({
    resolver: zodResolver(shippingSchema),
    defaultValues: checkoutData.shipping || {
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

  const onSubmit = (data: ShippingAddress) => {
    updateShipping(data);
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Adresa dostave
      </h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <Input id="company" {...form.register("company")} className="mt-1" />
        </div>

        {/* Address */}
        <div>
          <Label htmlFor="address">Adresa *</Label>
          <Input id="address" {...form.register("address")} className="mt-1" />
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

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <Button type="submit" size="lg">
            Nastavi na naplatu
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
