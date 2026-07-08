import { createHash } from "node:crypto";
import { cookies } from "next/headers";

export const adminCookieName = "ethny_admin_session";

export function isLocalAdminBypassEnabled() {
  const localSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.includes("localhost") ||
    process.env.NEXT_PUBLIC_SITE_URL?.includes("127.0.0.1");

  return (
    (process.env.NODE_ENV !== "production" ||
      (process.env.VERCEL !== "1" && Boolean(localSiteUrl))) &&
    process.env.ETHNY_DISABLE_LOCAL_ADMIN_BYPASS !== "true"
  );
}

export function getAdminSecret() {
  const secret = process.env.ADMIN_SECRET?.trim();

  if (!secret) {
    throw new Error("ADMIN_SECRET is missing.");
  }

  return secret;
}

export function hashAdminSecret(secret: string) {
  return createHash("sha256").update(secret).digest("hex");
}

export function isAdminAuthenticated() {
  if (isLocalAdminBypassEnabled()) {
    return true;
  }

  const secret = process.env.ADMIN_SECRET?.trim();

  if (!secret) {
    return false;
  }

  return cookies().get(adminCookieName)?.value === hashAdminSecret(secret);
}

export function isAdminRequestAuthorized(request: Request) {
  if (isLocalAdminBypassEnabled()) {
    return true;
  }

  const secret = process.env.ADMIN_SECRET?.trim();

  if (!secret) {
    return false;
  }

  const bearer = request.headers.get("authorization")?.trim();
  const headerSecret = request.headers.get("x-admin-secret")?.trim();
  const cookieHeader = request.headers.get("cookie") ?? "";
  const hashedSecret = hashAdminSecret(secret);

  return (
    bearer === `Bearer ${secret}` ||
    headerSecret === secret ||
    cookieHeader.includes(`${adminCookieName}=${hashedSecret}`)
  );
}
