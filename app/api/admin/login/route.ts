import { NextResponse } from "next/server";
import {
  adminCookieName,
  getAdminSecret,
  hashAdminSecret,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const submittedSecret = String(formData.get("adminSecret") ?? "").trim();

  if (!submittedSecret || submittedSecret !== getAdminSecret()) {
    return NextResponse.redirect(new URL("/email?error=invalid", request.url), {
      status: 303,
    });
  }

  const response = NextResponse.redirect(new URL("/email", request.url), {
    status: 303,
  });
  response.cookies.set(adminCookieName, hashAdminSecret(submittedSecret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
