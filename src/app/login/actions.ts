"use server";

import { cookies } from "next/headers";

export async function loginAction(password: string): Promise<{ success: boolean; error?: string }> {
  const sitePassword = process.env.SITE_PASSWORD;

  if (!sitePassword) {
    // No password configured — always succeed
    return { success: true };
  }

  if (password !== sitePassword) {
    return { success: false, error: "Incorrect password. Please try again." };
  }

  // Set a persistent httpOnly cookie (30 days)
  const cookieStore = await cookies();
  cookieStore.set("family_auth", `auth_${sitePassword}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  return { success: true };
}
