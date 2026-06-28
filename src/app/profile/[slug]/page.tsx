import Link from "next/link";
import { notFound } from "next/navigation";
import { familyMembers, getChildrenOf } from "@/lib/family-data";
import { getPersonWithOverrides } from "@/lib/profile-service";
import { SocialIcon } from "@/components/social-icon";

export default async function ProfilePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = await getPersonWithOverrides(slug);

  if (!person) {
    notFound();
  }

  const parents = familyMembers.filter((member) => person.parents.includes(member.slug));
  const children = getChildrenOf(person.slug);

  return (
    <section className="profile-shell">
      <div className="profile-photo">
        <img src={person.photo} alt={person.name} />
      </div>
      <div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "14px" }}>
          <Link href="/" className="pill">
            Back to tree
          </Link>
          <div className="pill">{person.branch} branch</div>
          <Link href={`/profile/${person.slug}/edit`} className="pill" style={{ background: "rgba(31, 26, 23, 0.08)", color: "var(--accent-4)" }}>
            Edit Profile
          </Link>
        </div>
        <h1 className="profile-name">{person.name}</h1>
        <p className="helper">{person.title}</p>
        <p className="profile-bio">{person.about}</p>

        <div className="profile-meta">
          {parents.length > 0 && <span className="pill">Parents: {parents.map((parent) => parent.name).join(", ")}</span>}
          {children.length > 0 && <span className="pill">Children: {children.map((child) => child.name).join(", ")}</span>}
        </div>

        <div className="section">
          <h2 className="section-title">Social links</h2>
          <div className="social-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
            {person.socials.map((social) => (
              <a key={social.label} href={social.href} className="button-ghost" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                <SocialIcon label={social.label} />
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Family links</h2>
          <div className="tree-links">
            {parents.map((parent) => (
              <Link key={parent.slug} href={`/profile/${parent.slug}`} className="pill">
                Parent: {parent.name}
              </Link>
            ))}
            {children.map((child) => (
              <Link key={child.slug} href={`/profile/${child.slug}`} className="pill">
                Child: {child.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
