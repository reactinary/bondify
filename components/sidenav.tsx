"use client";

import { ChartPie, HardHat, ScrollText, House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { path: "2/dashboard", label: "Dashboard", icon: <ChartPie /> },
  { path: "2/providers", label: "Providers", icon: <HardHat /> },
  { path: "2/invoices", label: "Invoices", icon: <ScrollText /> },
];

export function SideNav() {
  const pathname = usePathname();
  const lastPathSegment = pathname.split("/").pop();

  return (
    <div className="w-64 bg-white flex flex-col gap-8 p-4">
      <Link
            href={`/investment`}
            className="flex gap-2"
          >
            <House />
            <p>Home</p>
          </Link>
      <div className="flex flex-col gap-4">
      {NAV_LINKS.map(({ path, label, icon }) => {
        // @ts-expect-error:
        const isActive = ["dashboard", "invoices", "providers"].includes(lastPathSegment);

        return (
          <Link
            key={path}
            href={`/details/${path}`}
            // @ts-expect-error:
            className={`flex gap-2 ${isActive && path.includes(lastPathSegment) ? "font-bold" : ""}`}
          >
            {icon}
            {label}
          </Link>
        );
        
      })}
      </div>
    </div>
  );
}
