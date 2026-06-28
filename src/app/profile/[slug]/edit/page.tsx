import { notFound } from "next/navigation";
import { ProfileEditForm } from "@/components/profile-edit-form";
import { getPersonWithOverrides } from "@/lib/profile-service";
import { saveProfile } from "./actions";

interface ProfileEditPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProfileEditPage({ params }: ProfileEditPageProps) {
  const { slug } = await params;
  const person = await getPersonWithOverrides(slug);

  if (!person) {
    notFound();
  }

  return (
    <section style={{ maxWidth: "800px", margin: "0 auto", padding: "12px 0 32px" }}>
      <ProfileEditForm person={person} saveAction={saveProfile} />
    </section>
  );
}
