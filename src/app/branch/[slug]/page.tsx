import Link from "next/link";
import { notFound } from "next/navigation";
import { FamilyTreeGraph } from "@/components/family-tree-graph";
import { BranchSelector } from "@/components/branch-selector";
import { familyTree, findNodeBySlug, countMembers } from "@/lib/family-data";
import { getProfileOverrides } from "@/lib/profile-service";

interface BranchPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BranchPage({ params }: BranchPageProps) {
  const { slug } = await params;
  const branchTree = findNodeBySlug(familyTree, slug);

  if (!branchTree) {
    notFound();
  }

  const branches = familyTree.children.map((child) => ({
    name: child.members[0].name,
    slug: child.members[0].slug
  }));

  const overrides = await getProfileOverrides();
  const branchName = branchTree.members.map((m) => m.name).join(" & ");

  return (
    <section className="tree-page tree-page--viewport">
      <div className="tree-header">
        <div>
          <div className="pill" style={{ marginBottom: "8px" }}>Branch view • {countMembers(branchTree)} members</div>
          <h1 className="section-title">{branchName} Branch</h1>
          <p className="helper">Viewing the lineage of {branchName}.</p>
        </div>
        <div className="header-actions">
          <BranchSelector branches={branches} currentSlug={slug} />
          <Link href="/" className="button-ghost">
            View full tree
          </Link>
        </div>
      </div>

      <div id="family-graph" className="tree-stage">
        <FamilyTreeGraph tree={branchTree} overrides={overrides} />
      </div>
    </section>
  );
}
