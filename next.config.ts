import type { NextConfig } from "next";

const legacyPages = [
  ["index.html", "/"],
  ["shop.html", "/shop"],
  ["shop-02.html", "/shop"],
  ["collections.html", "/collections"],
  ["about.html", "/about"],
  ["contact-us.html", "/contact-us"],
  ["journal.html", "/journal"],
  ["login.html", "/login"],
  ["register.html", "/register"],
  ["checkout.html", "/checkout"],
  ["purchasing-plan.html", "/purchasing-plan"]
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...legacyPages.map(([source, destination]) => ({
        source: `/${source}`,
        destination,
        permanent: true
      })),
      {
        source: "/category/category-detail.html",
        destination: "/category/rattan-2025",
        permanent: true
      },
      {
        source: "/product/:slug.html",
        destination: "/product/:slug",
        permanent: true
      },
      {
        source: "/category/:slug.html",
        destination: "/category/:slug",
        permanent: true
      },
      {
        source: "/journal/:slug.html",
        destination: "/journal/:slug",
        permanent: true
      },
      {
        source: "/journal-categories/:slug.html",
        destination: "/journal-categories/:slug",
        permanent: true
      },
      {
        source: "/legal/:slug.html",
        destination: "/legal/:slug",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
