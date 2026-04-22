import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// --- Rate limiting (in-memory, per IP) ---
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 4;          // max requests
const RATE_WINDOW_MS = 60_000; // per 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT) return false;

  record.count++;
  return true;
}

// --- Bot filtering heuristics ---
const SPAM_KEYWORDS = [
  "casino", "crypto", "bitcoin", "forex", "loan", "seo service",
  "cheap meds", "viagra", "porn", "xxx", "make money fast",
];

function isSpam(message: string): boolean {
  const lower = message.toLowerCase();
  const urlMatches = (message.match(/https?:\/\//gi) ?? []).length;
  if (urlMatches > 2) return true;
  if (message.length < 10 || message.length > 2000) return true;
  if (SPAM_KEYWORDS.some((kw) => lower.includes(kw))) return true;
  return false;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    // 1. Rate limiting
    if (!checkRateLimit(ip)) {
      console.warn(`[spam] Rate limit exceeded — IP: ${ip}`);
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, service, message, website } = body;

    // 2. Honeypot check (silent reject)
    if (website) {
      console.warn(`[spam] Honeypot triggered — IP: ${ip}`);
      return NextResponse.json({ success: true });
    }

    // 3. Basic field validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 4. Bot / spam heuristics
    // if (isSpam(message) || isSpam(name)) {
    //   console.warn(`[spam] Spam content detected — IP: ${ip}`);
    //   return NextResponse.json({ success: true });
    // }

    // ✅ Send email
    await resend.emails.send({
      from: "Renevise <onboarding@resend.dev>",
      to: ["abroabbas44@gmail.com"],
      subject: `New Project Inquiry - ${service}`,
      html: `
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // ✅ Auto-reply to user
    // await resend.emails.send({
    //   from: "Renevise <onboarding@resend.dev>",
    //   to: [email],
    //   subject: "We received your inquiry",
    //   html: `
    //     <p>Hi ${name},</p>
    //     <p>We've received your project request and will get back to you shortly.</p>
    //     <p>– Renevise Team</p>
    //   `,
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
