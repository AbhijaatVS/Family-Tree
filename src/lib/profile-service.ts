import fs from "fs";
import path from "path";
import { createServerSupabaseClient } from "./supabase/server";
import { getPerson, Person, SocialLink } from "./family-data";

export interface ProfileOverride {
  name?: string;
  title?: string;
  about?: string;
  photo?: string;
  socials?: SocialLink[];
}

const LOCAL_FILE_PATH = path.join(process.cwd(), "src/lib/local-overrides.json");

function isSupabaseConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

function getSupabaseClient() {
  if (!isSupabaseConfigured()) return null;
  try {
    return createServerSupabaseClient();
  } catch (error) {
    console.warn("Failed to create Supabase client:", error);
    return null;
  }
}

function readLocalOverrides(): Record<string, ProfileOverride> {
  try {
    if (fs.existsSync(LOCAL_FILE_PATH)) {
      const data = fs.readFileSync(LOCAL_FILE_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading local overrides:", error);
  }
  return {};
}

function writeLocalOverrides(overrides: Record<string, ProfileOverride>) {
  try {
    const dir = path.dirname(LOCAL_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_FILE_PATH, JSON.stringify(overrides, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing local overrides:", error);
  }
}

export async function getProfileOverrides(): Promise<Record<string, ProfileOverride>> {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("slug, name, title, about, photo_url");

      if (profileError) throw profileError;

      const { data: socials, error: socialError } = await supabase
        .from("social_links")
        .select("profile_slug, label, url");

      if (socialError) throw socialError;

      const overrides: Record<string, ProfileOverride> = {};

      for (const p of profiles || []) {
        overrides[p.slug] = {
          name: p.name || undefined,
          title: p.title || undefined,
          about: p.about || undefined,
          photo: p.photo_url || undefined,
          socials: []
        };
      }

      for (const s of socials || []) {
        if (!overrides[s.profile_slug]) {
          overrides[s.profile_slug] = { socials: [] };
        }
        overrides[s.profile_slug].socials?.push({
          label: s.label,
          href: s.url
        });
      }

      return overrides;
    } catch (error) {
      console.error("Supabase query failed, falling back to local file:", error);
    }
  }

  return readLocalOverrides();
}

export async function getPersonWithOverrides(slug: string): Promise<Person | null> {
  const person = getPerson(slug);
  if (!person) return null;

  const overrides = await getProfileOverrides();
  const override = overrides[slug];

  if (override) {
    return {
      ...person,
      name: override.name !== undefined ? (override.name ?? person.name) : person.name,
      title: override.title !== undefined ? (override.title ?? person.title) : person.title,
      about: override.about !== undefined ? (override.about ?? person.about) : person.about,
      photo: override.photo !== undefined ? (override.photo ?? person.photo) : person.photo,
      socials: override.socials !== undefined ? (override.socials ?? person.socials) : person.socials
    };
  }

  return person;
}

export async function updateProfile(
  slug: string,
  data: {
    name?: string;
    title?: string;
    about?: string;
    photo?: string;
    socials?: SocialLink[];
  }
) {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { error: profileError } = await supabase.from("profiles").upsert({
        slug,
        name: data.name,
        title: data.title,
        about: data.about,
        photo_url: data.photo,
        updated_at: new Date().toISOString()
      });

      if (profileError) throw profileError;

      const { error: deleteError } = await supabase
        .from("social_links")
        .delete()
        .eq("profile_slug", slug);

      if (deleteError) throw deleteError;

      if (data.socials && data.socials.length > 0) {
        const { error: insertError } = await supabase.from("social_links").insert(
          data.socials.map((s) => ({
            profile_slug: slug,
            label: s.label,
            url: s.href
          }))
        );

        if (insertError) throw insertError;
      }

      return { success: true };
    } catch (error) {
      console.error("Supabase update failed:", error);
      throw error;
    }
  }

  const localOverrides = readLocalOverrides();
  localOverrides[slug] = {
    name: data.name,
    title: data.title,
    about: data.about,
    photo: data.photo,
    socials: data.socials
  };
  writeLocalOverrides(localOverrides);
  return { success: true };
}
