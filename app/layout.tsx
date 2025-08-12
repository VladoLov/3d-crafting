import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/session-provider";
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
    <html lang="hr" data-scroll-behavior="smooth">
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ProtectedCartSidebar />
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
