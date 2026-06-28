"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { TreeNode } from "@/lib/family-data";
import { getPerson } from "@/lib/family-data";

interface TreeGraphProps {
  tree: TreeNode;
  overrides?: Record<string, { photo?: string }>;
}

function FamilyTreeNode({
  node,
  isRoot = false,
  overrides,
  depth = 0
}: {
  node: TreeNode;
  isRoot?: boolean;
  overrides?: Record<string, { photo?: string }>;
  depth?: number;
}) {
  return (
    <div className={`tree-subtree${isRoot ? " tree-root" : ""}${node.children.length === 0 ? " tree-leaf" : ""}`}>
      <article className="graph-card">
        <div className="graph-members">
          {node.members.map((member) => {
            const overridePhoto = overrides?.[member.slug]?.photo;
            const defaultPhoto = getPerson(member.slug)?.photo;
            return (
              <Link key={member.slug} href={`/profile/${member.slug}`} className={`graph-member graph-member--level-${depth}`}>
                <span className="graph-member-photoWrap">
                  <img
                    src={overridePhoto || defaultPhoto}
                    alt={member.name}
                    className="graph-member-photo"
                    loading={isRoot ? "eager" : "lazy"}
                  />
                </span>
                <span className="graph-member-name">{member.name}</span>
              </Link>
            );
          })}
        </div>
        {node.note ? <p className="graph-note">{node.note}</p> : null}
      </article>

      {node.children.length > 0 ? (
        <div className="graph-children">
          {node.children.map((child) => (
            <FamilyTreeNode key={child.id} node={child} overrides={overrides} depth={depth + 1} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function FamilyTreeGraph({ tree, overrides }: TreeGraphProps) {
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (shell) {
      // Scroll to horizontal center
      const scrollTarget = (shell.scrollWidth - shell.clientWidth) / 2;
      shell.scrollLeft = scrollTarget;
    }
  }, [tree]);

  return (
    <div ref={shellRef} className="graph-shell">
      <div className="graph-canvas">
        <FamilyTreeNode node={tree} isRoot overrides={overrides} />
      </div>
    </div>
  );
}
