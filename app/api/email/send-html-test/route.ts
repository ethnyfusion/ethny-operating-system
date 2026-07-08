import { NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/admin-auth";
import { getResendClient, getResendFromEmail } from "@/lib/resend";

export const runtime = "nodejs";

type SendHtmlTestBody = {
  campaignId?: string;
  subject?: string;
  html?: string;
};

function htmlToText(html: string) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h1|h2|h3|li|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function POST(request: Request) {
  if (!isAdminRequestAuthorized(request)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized email test request." },
      { status: 401 },
    );
  }

  try {
    const body = (await request.json()) as SendHtmlTestBody;
    const subject = body.subject?.trim();
    const html = body.html?.trim();
    const to = process.env.RESEND_TEST_EMAIL;

    if (!to) {
      return NextResponse.json(
        { ok: false, error: "RESEND_TEST_EMAIL is missing." },
        { status: 400 },
      );
    }

    if (!subject || subject.length > 180) {
      return NextResponse.json(
        { ok: false, error: "Subject is required and must stay under 180 characters." },
        { status: 400 },
      );
    }

    if (!html || html.length < 120) {
      return NextResponse.json(
        { ok: false, error: "HTML draft is too short to send." },
        { status: 400 },
      );
    }

    if (html.length > 500_000) {
      return NextResponse.json(
        { ok: false, error: "HTML draft is too large." },
        { status: 400 },
      );
    }

    const { data, error } = await getResendClient().emails.send({
      from: getResendFromEmail(),
      to,
      subject,
      html,
      text: htmlToText(html),
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
      to,
      campaignId: body.campaignId,
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
