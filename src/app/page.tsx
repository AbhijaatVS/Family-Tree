import Link from "next/link";
import { FamilyTreeGraph } from "@/components/family-tree-graph";
import { BranchSelector } from "@/components/branch-selector";
import { familyTree, countMembers } from "@/lib/family-data";
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
          <div className="pill" style={{ marginBottom: "8px" }}>Family tree • {countMembers(familyTree)} members</div>
          <h1 className="section-title">Sri Shiv Niranjan Singh & Dhanvantri Devi</h1>
          <p className="helper">Tap any name below to open that profile.</p>
        </div>
        <div className="header-actions">
          <BranchSelector branches={branches} />
        </div>
      </div>

      <div id="family-graph" className="tree-stage">
        <FamilyTreeGraph tree={familyTree} overrides={overrides} defaultZoom={0.55} />
      </div>
    </section>
  );
}
