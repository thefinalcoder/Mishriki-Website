import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "mishriki.org",
  description: "Welcome to the personal website of Eli Mishriki, featuring systems, security, and creative coding.",
  keywords: ["Eli Mishriki", "software engineer", "security", "systems", "shaders", "web development"],
  authors: [{ name: "Eli Mishriki" }],
  openGraph: {
    title: "mishriki.org",
    description: "Welcome to the personal website of Eli Mishriki",
    type: "website",
    url: "https://mishriki.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
