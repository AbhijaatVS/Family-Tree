"use client";

import { useRouter } from "next/navigation";

interface BranchSelectorProps {
  branches: { name: string; slug: string }[];
  currentSlug?: string;
}

export function BranchSelector({ branches, currentSlug }: BranchSelectorProps) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    if (slug === "all") {
      router.push("/");
    } else {
      router.push(`/branch/${slug}`);
    }
  };

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
      <label htmlFor="branch-select" style={{ fontSize: "0.9rem", fontWeight: "bold", color: "var(--muted)" }}>
        View Branch:
      </label>
      <select
        id="branch-select"
        value={currentSlug || "all"}
        onChange={handleChange}
        style={{
          padding: "10px 18px",
          borderRadius: "999px",
          background: "rgba(255, 255, 255, 0.72)",
          border: "1px solid var(--border)",
          font: "inherit",
          fontWeight: "800",
          color: "var(--text)",
          cursor: "pointer",
          outline: "none",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
        }}
      >
        <option value="all">Full Family Tree</option>
        {branches.map((b) => (
          <option key={b.slug} value={b.slug}>
            {b.name}'s Branch
          </option>
        ))}
      </select>
    </div>
  );
}
