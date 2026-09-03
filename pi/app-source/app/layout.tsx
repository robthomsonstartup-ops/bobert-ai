import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bobert Lighting Configurator",
  description:
    "Build verified lighting alternate BOMs from project drawings and manufacturer evidence.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
