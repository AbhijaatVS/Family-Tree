import Link from "next/link";

export default function NotFound() {
  return (
    <section className="panel" style={{ padding: "32px" }}>
      <div className="pill">Not found</div>
      <h1 className="section-title">That profile does not exist yet.</h1>
      <p className="helper">Use the tree on the homepage to find a valid branch or add the relative in the data file.</p>
      <Link href="/" className="button">
        Back to tree
      </Link>
    </section>
  );
}
