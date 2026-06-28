import Link from "next/link";
import { FamilyTreeGraph } from "@/components/family-tree-graph";
import { BranchSelector } from "@/components/branch-selector";
import { familyTree } from "@/lib/family-data";
import { getProfileOverrides } from "@/lib/profile-service";

export default async function HomePage() {
  const branches = familyTree.children.map((child) => ({
    name: child.members[0].name,
    slug: child.members[0].slug
  }));

  // Fetch dynamic photo and profile overrides
  const overrides = await getProfileOverrides();

  return (
    <section className="tree-page tree-page--viewport">
      <div className="tree-header">
        <div>
          <div className="pill" style={{ marginBottom: "8px" }}>Family tree</div>
          <h1 className="section-title">Sri Shiv Niranjan Singh & Dhanvantri Devi</h1>
          <p className="helper">Tap any name below to open that profile.</p>
        </div>
        <div className="header-actions">
          <BranchSelector branches={branches} />
          <a href="#family-graph" className="button-ghost">
            Jump to tree
          </a>
        </div>
      </div>

      <div id="family-graph" className="tree-stage">
        <FamilyTreeGraph tree={familyTree} overrides={overrides} />
      </div>
    </section>
  );
}
