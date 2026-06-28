import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display"
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "The Batthi Royal Dynasty",
  description: "A public family tree with branch views and profile pages."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${nunito.variable}`}>
        <div className="shell">
          <header className="topbar">
            <Link href="/" className="brand">
              <span className="brand-mark">BD</span>
              <span>
                <strong>The Batthi Royal Dynasty</strong>
                <small>Family Tree & Branch Archives</small>
              </span>
            </Link>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
