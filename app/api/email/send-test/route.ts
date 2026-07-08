import { NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/admin-auth";
import { renderCampaignEmail } from "@/lib/email-renderer";
import { getResendClient, getResendFromEmail } from "@/lib/resend";

export const runtime = "nodejs";

type SendTestBody = {
  to?: string;
  campaignId?: string;
  variables?: Record<string, string>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!isAdminRequestAuthorized(request)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized email test request." },
      { status: 401 },
    );
  }

  try {
    const body = (await request.json()) as SendTestBody;

    if (!body.to || !emailPattern.test(body.to)) {
      return NextResponse.json(
        { ok: false, error: "A valid `to` email is required." },
        { status: 400 },
      );
    }

    if (!body.campaignId) {
      return NextResponse.json(
        { ok: false, error: "`campaignId` is required." },
        { status: 400 },
      );
    }

    const rendered = await renderCampaignEmail(body.campaignId, body.variables);
    const resend = getResendClient();
    const from = getResendFromEmail();

    const { data, error } = await resend.emails.send({
      from,
      to: body.to,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message, campaignId: body.campaignId },
        { status: 400 },
      );
    }

    return NextResponse.json({
      ok: true,
      id: data?.id,
      campaignId: rendered.campaign.id,
      subject: rendered.subject,
      to: body.to,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown send error.",
      },
      { status: 500 },
    );
  }
}
