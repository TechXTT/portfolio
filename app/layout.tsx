import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bozhilov.me"),
  title: "Martin Bozhilov | Backend Developer",
  description:
    "Junior software engineer and backend developer focused on Go, APIs, database-driven product systems, cloud deployment, and developer tools.",
  authors: [{ name: "Martin Bozhilov" }],
  keywords: [
    "Martin Bozhilov",
    "Backend Developer",
    "Go Developer",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "Developer Tools",
    "TORM",
  ],
  openGraph: {
    title: "Martin Bozhilov | Backend Developer",
    description:
      "Junior software engineer and backend developer focused on Go, APIs, database-driven product systems, cloud deployment, and developer tools.",
    url: "https://bozhilov.me",
    siteName: "Martin Bozhilov Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Martin Bozhilov | Backend Developer",
    description:
      "Junior software engineer and backend developer focused on Go, APIs, database-driven product systems, cloud deployment, and developer tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
