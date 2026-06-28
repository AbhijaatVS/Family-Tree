"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Person, SocialLink } from "@/lib/family-data";

interface ProfileEditFormProps {
  person: Person;
  saveAction: (
    slug: string,
    data: {
      name: string;
      title: string;
      about: string;
      photo: string;
      socials: SocialLink[];
    }
  ) => Promise<{ success: boolean; error?: string }>;
}

export function ProfileEditForm({ person, saveAction }: ProfileEditFormProps) {
  const router = useRouter();
  const [name, setName] = useState(person.name);
  const [title, setTitle] = useState(person.title);
  const [about, setAbout] = useState(person.about);
  const [photoMode, setPhotoMode] = useState<"url" | "upload">(
    person.photo.startsWith("data:image/") ? "upload" : "url"
  );
  const [photoUrl, setPhotoUrl] = useState(person.photo.startsWith("data:image/") ? "" : person.photo);
  const [photoBase64, setPhotoBase64] = useState(person.photo.startsWith("data:image/") ? person.photo : "");
  const [socials, setSocials] = useState<SocialLink[]>(person.socials || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSocial = () => {
    setSocials([...socials, { label: "Instagram", href: "" }]);
  };

  const handleSocialChange = (index: number, field: keyof SocialLink, value: string) => {
    const updated = [...socials];
    updated[index] = { ...updated[index]!, [field]: value };
    setSocials(updated);
  };

  const handleRemoveSocial = (index: number) => {
    setSocials(socials.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const finalPhoto = photoMode === "upload" ? (photoBase64 || person.photo) : photoUrl;

    try {
      const result = await saveAction(person.slug, {
        name,
        title,
        about,
        photo: finalPhoto,
        socials
      });

      if (result.success) {
        router.push(`/profile/${person.slug}`);
        router.refresh();
      } else {
        setError(result.error || "An error occurred while saving the profile.");
      }
    } catch (err: any) {
      setError(err?.message || "A network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="editor-shell" style={{ background: "var(--panel-strong)", padding: "32px", borderRadius: "28px" }}>
      <div>
        <h1 className="profile-name" style={{ marginBottom: "8px" }}>Edit Profile: {person.name}</h1>
        <p className="helper">Update your details. Dynamic changes will apply across the family tree.</p>
      </div>

      {error && (
        <div style={{ padding: "14px 18px", borderRadius: "16px", background: "rgba(205, 28, 24, 0.12)", color: "#9b1313", fontWeight: "bold" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="editor-form">
        <div className="form-grid">
          <div className="field">
            <label htmlFor="name-input" style={{ fontWeight: "700" }}>Full Name</label>
            <input
              id="name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="title-input" style={{ fontWeight: "700" }}>Role/Title</label>
            <input
              id="title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Family member, Branch couple"
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="about-input" style={{ fontWeight: "700" }}>About / Bio</label>
          <textarea
            id="about-input"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell the family about yourself, your hobbies, occupation, or location..."
            required
          />
        </div>

        <div className="field" style={{ padding: "20px", background: "rgba(70, 23, 20, 0.03)", borderRadius: "20px", border: "1px solid var(--border)" }}>
          <label style={{ fontWeight: "700", marginBottom: "8px", display: "block" }}>Profile Picture</label>
          
          <div style={{ display: "flex", gap: "20px", marginBottom: "16px" }}>
            <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", cursor: "pointer", fontWeight: "bold" }}>
              <input
                type="radio"
                name="photoMode"
                checked={photoMode === "upload"}
                onChange={() => setPhotoMode("upload")}
              />
              Upload Image
            </label>
            <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", cursor: "pointer", fontWeight: "bold" }}>
              <input
                type="radio"
                name="photoMode"
                checked={photoMode === "url"}
                onChange={() => setPhotoMode("url")}
              />
              Provide Image URL
            </label>
          </div>

          {photoMode === "upload" ? (
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ width: "90px", height: "90px", borderRadius: "18px", overflow: "hidden", background: "#d9caba", border: "1px solid var(--border)" }}>
                <img
                  src={photoBase64 || person.photo}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ border: "none", padding: "0" }} />
                <p className="helper" style={{ marginTop: "4px" }}>Recommended: square image, max 2MB.</p>
              </div>
            </div>
          ) : (
            <div className="field">
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://example.com/my-photo.jpg"
              />
            </div>
          )}
        </div>

        <div className="field" style={{ padding: "20px", background: "rgba(70, 23, 20, 0.03)", borderRadius: "20px", border: "1px solid var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <label style={{ fontWeight: "700" }}>Social Links</label>
            <button type="button" onClick={handleAddSocial} className="button-ghost" style={{ padding: "8px 14px", fontSize: "0.85rem", borderRadius: "999px" }}>
              + Add Link
            </button>
          </div>

          {socials.length === 0 ? (
            <p className="helper" style={{ fontStyle: "italic", textAlign: "center", margin: "20px 0" }}>No social links linked. Tap '+ Add Link' above to add yours!</p>
          ) : (
            <div style={{ display: "grid", gap: "12px" }}>
              {socials.map((social, index) => (
                <div key={index} style={{ display: "grid", gridTemplateColumns: "150px 1fr auto", gap: "10px", alignItems: "center" }}>
                  <select
                    value={social.label}
                    onChange={(e) => handleSocialChange(index, "label", e.target.value)}
                    style={{ padding: "10px 14px", borderRadius: "12px", border: "1px solid var(--border)", font: "inherit" }}
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Twitter">Twitter/X</option>
                    <option value="GitHub">GitHub</option>
                    <option value="Website">Personal Webpage</option>
                    <option value="Email">Email Address</option>
                  </select>
                  <input
                    type="text"
                    value={social.href}
                    onChange={(e) => handleSocialChange(index, "href", e.target.value)}
                    placeholder={social.label === "Email" ? "mailto:name@example.com" : "https://instagram.com/username"}
                    required
                    style={{ padding: "10px 14px", borderRadius: "12px", border: "1px solid var(--border)" }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSocial(index)}
                    className="button-ghost"
                    style={{
                      padding: "10px 14px",
                      borderRadius: "12px",
                      background: "rgba(205, 28, 24, 0.1)",
                      color: "#9b1313",
                      borderColor: "rgba(205, 28, 24, 0.2)",
                      fontWeight: "bold"
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="actions" style={{ marginTop: "14px" }}>
          <Link href={`/profile/${person.slug}`} className="button-ghost">
            Cancel
          </Link>
          <button type="submit" className="button" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
