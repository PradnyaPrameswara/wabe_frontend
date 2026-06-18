import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CartProvider } from "@/components/cart/CartProvider";
import { site } from "@/data/site";
import "./site.css";
import "./layout-overrides.css";

export const metadata: Metadata = {
  title: site.name,
  description:
    "B2B e-commerce storefront for handmade Balinese ceramics and export-ready artisan goods.",
  icons: {
    apple: "/media/wabe-logo.png",
    icon: "/media/wabe-logo.png"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
