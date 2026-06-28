"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { TreeNode } from "@/lib/family-data";
import { getPerson } from "@/lib/family-data";

interface TreeGraphProps {
  tree: TreeNode;
  overrides?: Record<string, { name?: string; photo?: string; birthday?: string }>;
}

function FamilyTreeNode({
  node,
  isRoot = false,
  overrides,
  depth = 0
}: {
  node: TreeNode;
  isRoot?: boolean;
  overrides?: Record<string, { name?: string; photo?: string; birthday?: string }>;
  depth?: number;
}) {
  return (
    <div className={`tree-subtree${isRoot ? " tree-root" : ""}${node.children.length === 0 ? " tree-leaf" : ""}`}>
      <article className="graph-card">
        <div className="graph-members">
          {node.members.map((member) => {
            const overrideName = overrides?.[member.slug]?.name;
            const overridePhoto = overrides?.[member.slug]?.photo;
            const defaultPhoto = getPerson(member.slug)?.photo;
            return (
              <Link key={member.slug} href={`/profile/${member.slug}`} className={`graph-member graph-member--level-${depth}`}>
                <span className="graph-member-photoWrap">
                  <img
                    src={overridePhoto || defaultPhoto}
                    alt={overrideName || member.name}
                    className="graph-member-photo"
                    loading={isRoot ? "eager" : "lazy"}
                  />
                </span>
                <span className="graph-member-name">{overrideName || member.name}</span>
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
  const [zoom, setZoom] = useState(0.35); // Start zoomed out fully to fit the tree on screen

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 1.5));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.25));
  const resetZoom = () => setZoom(1.0);
  const fitZoom = () => setZoom(0.35);

  useEffect(() => {
    const shell = shellRef.current;
    if (shell) {
      // Scroll to horizontal center
      const scrollTarget = (shell.scrollWidth - shell.clientWidth) / 2;
      shell.scrollLeft = scrollTarget;
    }
  }, [tree, zoom]);

  return (
    <div ref={shellRef} className="graph-shell" style={{ position: "relative" }}>
      {/* Floating Zoom Controls Panel */}
      <div className="graph-zoom-controls">
        <button onClick={zoomOut} className="zoom-btn" title="Zoom Out" aria-label="Zoom Out">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
        <span className="zoom-value">{Math.round(zoom * 100)}%</span>
        <button onClick={zoomIn} className="zoom-btn" title="Zoom In" aria-label="Zoom In">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
        <button onClick={fitZoom} className="zoom-btn zoom-btn--wide" title="Fit Entire Tree">
          Fit
        </button>
        <button onClick={resetZoom} className="zoom-btn zoom-btn--wide" title="Actual Size (100%)">
          100%
        </button>
      </div>

      <div className="graph-canvas" style={{ zoom } as React.CSSProperties}>
        <FamilyTreeNode node={tree} isRoot overrides={overrides} />
      </div>
    </div>
  );
}
