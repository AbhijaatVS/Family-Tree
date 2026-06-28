import { createClient } from "@supabase/supabase-js";

function normalizeUrl(url: string): string {
  let cleaned = url.trim();
  if (cleaned.endsWith("/")) {
    cleaned = cleaned.slice(0, -1);
  }
  if (cleaned.endsWith("/rest/v1")) {
    cleaned = cleaned.slice(0, -8);
  }
  return cleaned;
}

export function createBrowserSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing Supabase browser environment variables.");
  }

  return createClient(normalizeUrl(url), anonKey);
}
