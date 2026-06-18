import { NextResponse } from "next/server";
import { COLLECTION_PAGE_SIZE, getPaginatedShopCollections } from "@/lib/catalog/collections";

function readPositiveInteger(value: string | null, fallback: number) {
  if (!value) return fallback;

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function GET(request: Request) {
  const url = new URL(request.url);
  const page = readPositiveInteger(url.searchParams.get("page"), 1);
  const limit = readPositiveInteger(url.searchParams.get("limit"), COLLECTION_PAGE_SIZE);

  return NextResponse.json(getPaginatedShopCollections({ limit, page }));
}
