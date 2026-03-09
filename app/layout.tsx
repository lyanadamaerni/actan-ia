import "./globals.css";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Actan IA",
  description: "Macro intelligence SaaS MVP",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <div className="app-shell">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}