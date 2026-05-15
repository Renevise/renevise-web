import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

const KNOWN_TYPES = new Set([
  "home",
  "about",
  "contact",
  "service",
  "caseStudy",
  "testimonial",
]);

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "Server is missing SANITY_REVALIDATE_SECRET" },
      { status: 500 }
    );
  }

  const provided =
    req.headers.get("x-revalidate-secret") ??
    req.nextUrl.searchParams.get("secret");

  if (provided !== secret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: { _type?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const type = body._type;
  if (!type || !KNOWN_TYPES.has(type)) {
    return NextResponse.json(
      { message: `Unknown or missing _type: ${type ?? "(none)"}` },
      { status: 400 }
    );
  }

  revalidateTag(type);

  return NextResponse.json({ revalidated: true, tag: type, now: Date.now() });
}
