import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ProtectedCartSidebar } from "@/components/cart/protected-cart-sidebar";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Vlado Webshop - Personalizirani Proizvodi",
  description:
    "Specijalizirani webshop za graviranje, CNC obradu, 3D print i svadbene proizvode",
  keywords: "graviranje, CNC, 3D print, svadbe, personalizirani proizvodi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <Providers>
          <Navigation />
          <main className="pt-16">{children}</main>
          <Footer />
          <ProtectedCartSidebar />
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
