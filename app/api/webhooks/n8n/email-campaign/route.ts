import { NextResponse } from "next/server";
import { renderCampaignEmail } from "@/lib/email-renderer";
import { getResendClient, getResendFromEmail } from "@/lib/resend";

export const runtime = "nodejs";

type N8nEmailCampaignBody = {
  campaignId?: string;
  contact?: {
    email?: string;
    firstName?: string;
    lastName?: string;
  };
  variables?: Record<string, string>;
  dryRun?: boolean;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isAuthorized(request: Request) {
  const secret = process.env.N8N_WEBHOOK_SECRET;

  if (!secret) {
    return false;
  }

  const bearer = request.headers.get("authorization");
  const headerSecret = request.headers.get("x-n8n-webhook-secret");

  return bearer === `Bearer ${secret}` || headerSecret === secret;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { ok: false, error: "Invalid or missing n8n webhook secret." },
      { status: 401 },
    );
  }

  try {
    const body = (await request.json()) as N8nEmailCampaignBody;
    const to = body.contact?.email;

    if (!to || !emailPattern.test(to)) {
      return NextResponse.json(
        { ok: false, error: "A single valid `contact.email` is required." },
        { status: 400 },
      );
    }

    if (!body.campaignId) {
      return NextResponse.json(
        { ok: false, error: "`campaignId` is required." },
        { status: 400 },
      );
    }

    const rendered = await renderCampaignEmail(body.campaignId, {
      ...body.variables,
      firstName: body.variables?.firstName ?? body.contact?.firstName,
      lastName: body.variables?.lastName ?? body.contact?.lastName,
    });

    if (body.dryRun) {
      return NextResponse.json({
        ok: true,
        dryRun: true,
        campaignId: rendered.campaign.id,
        subject: rendered.subject,
        to,
        html: rendered.html,
        text: rendered.text,
      });
    }

    const resend = getResendClient();
    const from = getResendFromEmail();
    const { data, error } = await resend.emails.send({
      from,
      to,
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
      to,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Unknown n8n email error.",
      },
      { status: 500 },
    );
  }
}
