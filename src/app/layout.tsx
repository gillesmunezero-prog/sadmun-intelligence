import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SADMUN Intelligence",
  description:
    "Plateforme d'intelligence economique et commerciale specialisee sur le Mozambique",
};

/**
 * Layout racine. Le mode sombre est gere via la classe "dark" sur <html>,
 * elle-meme pilotee cote client par le ThemeProvider (voir
 * src/components/theme/ThemeProvider.tsx) qui lit/ecrit la preference
 * utilisateur dans le localStorage.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}
