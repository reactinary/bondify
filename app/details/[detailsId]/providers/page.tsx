import {Filters2} from "@/components/filters";
import { ProvidersTable } from "@/components/providers-table";
import { BadgeCheck } from "lucide-react";

import INVESTMENTS from "@/data/investments";

const INVESTMENT = INVESTMENTS[1];

export default function ProvidersPage() {
  return (
    <div className="px-4 py-8 w-full">
          <HeaderSection investment={INVESTMENT} />
      <h2 className="text-2xl font-semibold mb-4">Providers details</h2>
      <Filters2 className="mb-3" />
      <ProvidersTable />
    </div>
  );
}

function HeaderSection({ investment }: { investment: any }) {
  return (
    <section className="mb-8">
      <div className="flex gap-2 items-center">
        <h2 className="text-xl font-bold">{investment.company}</h2>
        <BadgeCheck size={20} color="#5549c1" />
      </div>

      <div>
        {" "}
        {investment.field} - {investment.country}
      </div>
    </section>
  );
}