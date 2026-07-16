import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin-shell";
import { getServerEnv } from "@/config/env";

export const metadata = { title: "Pilotage" };

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const env = getServerEnv();
  if (process.env.NODE_ENV === "production") {
    const cookieStore = await cookies();
    const suppliedToken = cookieStore.get("vinaria_admin")?.value;
    if (!env.adminAccessToken || suppliedToken !== env.adminAccessToken) redirect("/");
  }
  return <AdminShell>{children}</AdminShell>;
}
