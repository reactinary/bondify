import Filters from "@/components/filters";
import { InvestmentCard } from "@/components/investment-card";
import INVESTMENTS from "@/data/investments";

export default function InvestmentPage() {
  return (
    <div className="bg-gray-100">
      <Filters className="m-3" />
      <div className="grid grid-cols-3 gap-3 px-3 pt-3">
        {INVESTMENTS.map((investment) => {
          return <InvestmentCard investment={investment} key={investment.id} />;
        })}
      </div>
    </div>
  );
}
