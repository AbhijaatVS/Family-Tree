import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  const diagnostics: Record<string, any> = {
    url_configured: !!url,
    anon_key_configured: !!anonKey,
    service_role_key_configured: !!serviceRoleKey,
    url_value_preview: url ? `${url.substring(0, 20)}... [length: ${url.length}]` : "missing",
    url_has_trailing_slash: url.endsWith("/"),
    url_has_rest_suffix: url.includes("/rest/v1"),
    connection_test: "Not run yet"
  };

  if (!url || !serviceRoleKey) {
    diagnostics.connection_test = "Failed: Missing URL or Service Role Key in environment variables.";
    return NextResponse.json(diagnostics);
  }

  try {
    let cleanedUrl = url.trim();
    if (cleanedUrl.endsWith("/")) {
      cleanedUrl = cleanedUrl.slice(0, -1);
    }
    if (cleanedUrl.endsWith("/rest/v1")) {
      cleanedUrl = cleanedUrl.slice(0, -8);
    }

    // Initialize Supabase Client with Service Role Key
    const client = createClient(cleanedUrl, serviceRoleKey);
    
    // Test selecting from profiles table
    const { data, error } = await client.from("profiles").select("slug").limit(1);
    
    if (error) {
      diagnostics.connection_test = `Failed: ${error.message} (code: ${error.code})`;
    } else {
      diagnostics.connection_test = "Success! Successfully connected and queried the 'profiles' table.";
    }
  } catch (e: any) {
    diagnostics.connection_test = `Failed client creation: ${e.message}`;
  }

  return NextResponse.json(diagnostics);
}
export const dynamic = "force-dynamic";
