import { NextResponse } from "next/server";
import { adminCookieName } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/email", request.url), {
    status: 303,
  });
  response.cookies.delete(adminCookieName);
  return response;
}
