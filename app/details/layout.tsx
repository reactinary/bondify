import { SideNav } from "@/components/sidenav";
import type { PropsWithChildren } from "react";

export default function DetailsLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex gap-4 bg-gray-100">
      <SideNav />
      {children}
    </div>
  );
}
