"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Structure du menu principal, telle que definie dans les specifications
// fonctionnelles de SADMUN Intelligence.
const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tenders", label: "Appels d'offres" },
  { href: "/pipeline", label: "Pipeline commercial" },
  { href: "/companies", label: "Entreprises" },
  { href: "/decision-makers", label: "Decideurs" },
  { href: "/funders", label: "Bailleurs" },
  { href: "/ngos", label: "ONG" },
  { href: "/consultants", label: "Consultants" },
  { href: "/projects", label: "Projets" },
  { href: "/crm", label: "CRM" },
  { href: "/documents", label: "Documents" },
  { href: "/emails", label: "Emails" },
  { href: "/calendar", label: "Calendrier" },
  { href: "/stats", label: "Statistiques" },
  { href: "/admin", label: "Administration" },
];

/**
 * Barre de navigation laterale principale. Met en surbrillance la page
 * active et reste utilisable au clavier (liens natifs Next.js).
 */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigation principale"
      className="flex h-full w-64 flex-col gap-1 border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="mb-4 px-2 text-lg font-semibold text-brand-700 dark:text-brand-300">
        SADMUN Intelligence
      </div>

      {NAV_ITEMS.map((item) => {
        const isActive = pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-brand-100 text-brand-900 dark:bg-brand-900/40 dark:text-brand-100"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
