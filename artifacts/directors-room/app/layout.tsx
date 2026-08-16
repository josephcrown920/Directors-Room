import "./globals.css";
import type { Metadata } from "next";
import TopNav from "@/components/ui/TopNav";

export const metadata: Metadata = {
  title: "Directors Room — Cinematic AI Studio",
  description: "Storyboard, generate, and direct AI film sequences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased bg-ink text-white">
        <TopNav />
        {children}
      </body>
    </html>
  );
}
