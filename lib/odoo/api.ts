import type { Product } from "@/data/products";
import type { CartItem } from "@/lib/cart/types";

type OdooFetchOptions = RequestInit & {
  authToken?: string;
};

export type B2BLoginPayload = {
  email: string;
  password: string;
};

export type CheckoutPayload = {
  buyerEmail: string;
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    zip: string;
    country: string;
  };
  items: CartItem[];
  buyerNote?: string;
};

const ODOO_BASE_URL = process.env.ODOO_BASE_URL;
const ODOO_API_KEY = process.env.ODOO_API_KEY;

async function odooFetch<T>(path: string, options: OdooFetchOptions = {}): Promise<T> {
  if (!ODOO_BASE_URL) {
    throw new Error("ODOO_BASE_URL is not configured.");
  }

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (ODOO_API_KEY) {
    headers.set("Authorization", `Bearer ${ODOO_API_KEY}`);
  }

  if (options.authToken) {
    headers.set("X-Buyer-Session", options.authToken);
  }

  const response = await fetch(`${ODOO_BASE_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Odoo request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchOdooProducts(): Promise<Product[]> {
  return odooFetch<Product[]>("/api/b2b/products");
}

export async function fetchOdooProduct(slug: string): Promise<Product | null> {
  return odooFetch<Product | null>(`/api/b2b/products/${slug}`);
}

export async function loginB2BBuyer(payload: B2BLoginPayload) {
  return odooFetch<{ token: string; buyerId: number; email: string }>("/api/b2b/login", {
    body: JSON.stringify(payload),
    method: "POST"
  });
}

export async function createOdooSalesOrder(payload: CheckoutPayload, authToken?: string) {
  return odooFetch<{ saleOrderId: number; saleOrderName: string; portalUrl?: string }>(
    "/api/b2b/sale-orders",
    {
      authToken,
      body: JSON.stringify(payload),
      method: "POST"
    }
  );
}

export async function saveOdooPurchasingPlan(items: CartItem[], buyerNote: string, authToken?: string) {
  return odooFetch<{ saved: boolean; activityId?: number }>("/api/b2b/purchasing-plan", {
    authToken,
    body: JSON.stringify({ buyerNote, items }),
    method: "POST"
  });
}
