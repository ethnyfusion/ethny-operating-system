import { Resend } from "resend";

export function getResendApiKey() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is missing. Add it to .env.local before sending email.",
    );
  }

  return apiKey;
}

export function getResendClient() {
  return new Resend(getResendApiKey());
}

export function getResendFromEmail() {
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!fromEmail) {
    throw new Error(
      "RESEND_FROM_EMAIL is missing. Add a verified sender to .env.local.",
    );
  }

  return fromEmail;
}
