import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { renderCampaignEmail } from "@/lib/email-renderer";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isAdminAuthenticated()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const url = new URL(request.url);
  const campaignId = url.searchParams.get("campaignId");

  if (!campaignId) {
    return new NextResponse("Missing campaignId", { status: 400 });
  }

  try {
    const rendered = await renderCampaignEmail(campaignId, {
      firstName: "Reginald",
      websiteLink: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ops.ethny.be",
      unsubscribeLink: "https://ethny.be/unsubscribe",
    });

    return new NextResponse(rendered.html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : "Preview render failed",
      { status: 500 },
    );
  }
}
