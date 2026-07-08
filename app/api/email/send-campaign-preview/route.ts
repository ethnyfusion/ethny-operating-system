import { NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/admin-auth";
import { renderCampaignEmail } from "@/lib/email-renderer";

export const runtime = "nodejs";

type PreviewBody = {
  campaignId?: string;
  variables?: Record<string, string>;
};

export async function POST(request: Request) {
  if (!isAdminRequestAuthorized(request)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized campaign preview request." },
      { status: 401 },
    );
  }

  try {
    const body = (await request.json()) as PreviewBody;

    if (!body.campaignId) {
      return NextResponse.json(
        { ok: false, error: "`campaignId` is required." },
        { status: 400 },
      );
    }

    const rendered = await renderCampaignEmail(body.campaignId, body.variables);

    return NextResponse.json({
      ok: true,
      campaignId: rendered.campaign.id,
      subject: rendered.subject,
      previewText: rendered.previewText,
      html: rendered.html,
      text: rendered.text,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Unknown preview render error.",
      },
      { status: 500 },
    );
  }
}
