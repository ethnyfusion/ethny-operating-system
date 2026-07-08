import { NextResponse } from "next/server";

export const runtime = "nodejs";

const supportedEvents = new Set([
  "email.delivered",
  "email.opened",
  "email.clicked",
  "email.bounced",
  "email.complained",
  "delivered",
  "opened",
  "clicked",
  "bounced",
  "complained",
]);

function isAuthorized(request: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;

  if (!secret) {
    return true;
  }

  const bearer = request.headers.get("authorization");
  const headerSecret = request.headers.get("x-resend-webhook-secret");

  return bearer === `Bearer ${secret}` || headerSecret === secret;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { ok: false, error: "Invalid Resend webhook secret." },
      { status: 401 },
    );
  }

  const event = await request.json();
  const eventType = String(event.type ?? event.event ?? "unknown");

  if (!supportedEvents.has(eventType)) {
    console.info("Resend webhook received unhandled event", {
      eventType,
      id: event.id,
    });
  } else {
    console.info("Resend webhook received", {
      eventType,
      id: event.id,
      emailId: event.data?.email_id ?? event.data?.id,
      to: event.data?.to,
    });
  }

  // Future CRM update point: Notion, Resend Audience tags, or n8n callback.
  return NextResponse.json({ ok: true, received: eventType });
}
