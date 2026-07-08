import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getEmailCampaign } from "@/lib/email-campaigns";
import { renderCampaignEmail } from "@/lib/email-renderer";
import { getResendClient, getResendFromEmail } from "@/lib/resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.redirect(new URL("/email?error=unauthorized", request.url), {
      status: 303,
    });
  }

  const formData = await request.formData();
  const campaignId = String(formData.get("campaignId") ?? "");
  const to = String(formData.get("to") ?? process.env.RESEND_TEST_EMAIL ?? "");
  const firstName = String(formData.get("firstName") ?? "Reginald");

  if (!campaignId || !getEmailCampaign(campaignId)) {
    return NextResponse.redirect(new URL("/email?error=campaign", request.url), {
      status: 303,
    });
  }

  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return NextResponse.redirect(new URL("/email?error=email", request.url), {
      status: 303,
    });
  }

  try {
    const rendered = await renderCampaignEmail(campaignId, {
      firstName,
      websiteLink: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ops.ethny.be",
      unsubscribeLink: "https://ethny.be/unsubscribe",
    });

    const { data, error } = await getResendClient().emails.send({
      from: getResendFromEmail(),
      to,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
    });

    if (error) {
      const message = encodeURIComponent(error.message);
      return NextResponse.redirect(
        new URL(`/email?error=resend&message=${message}`, request.url),
        { status: 303 },
      );
    }

    return NextResponse.redirect(
      new URL(
        `/email?sent=1&campaignId=${encodeURIComponent(campaignId)}&id=${encodeURIComponent(data?.id ?? "")}`,
        request.url,
      ),
      { status: 303 },
    );
  } catch (error) {
    const message = encodeURIComponent(
      error instanceof Error ? error.message : "Unknown send error",
    );
    return NextResponse.redirect(
      new URL(`/email?error=send&message=${message}`, request.url),
      { status: 303 },
    );
  }
}
