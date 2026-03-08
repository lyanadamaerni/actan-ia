import "./globals.css";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Actan IA",
  description: "AI macro intelligence platform for traders",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-neutral-950 text-white antialiased">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.12),_transparent_30%),linear-gradient(to_bottom,_#050816,_#0a0f1f)]">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}