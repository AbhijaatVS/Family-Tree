"use server";

import { updateProfile } from "@/lib/profile-service";
import { revalidatePath } from "next/cache";
import type { SocialLink } from "@/lib/family-data";

export async function saveProfile(
  slug: string,
  data: {
    name?: string;
    title: string;
    about: string;
    photo: string;
    socials: SocialLink[];
  }
) {
  try {
    await updateProfile(slug, data);
    revalidatePath(`/profile/${slug}`);
    revalidatePath("/");
    revalidatePath("/branch/[slug]", "page");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update profile." };
  }
}
