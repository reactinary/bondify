import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Investment } from "@/lib/types/investment";
import { Equal, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";

export function InvestmentCard({ investment }: { investment: Investment }) {
  let directionIcon;

  const startDate = new Date(investment.date);
  function addMonthsToDate(date: any, months: any) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  const endDate = addMonthsToDate(startDate, investment.maturity);

  function calculateElapsedTimePercentage(startDate: any, endDate: any) {
    const now = new Date();

    if (now >= endDate) {
      return 100;
    }
    if (now <= startDate) {
      return 0;
    }
    const totalTime = endDate - startDate;
    // @ts-ignore
    const elapsedTime = now - startDate;

    return (elapsedTime / totalTime) * 100; // Pourcentage du temps écoulé
  }

  const percentageTime = calculateElapsedTimePercentage(startDate, endDate);

  const spentAmount = (percentageTime * Math.random() * investment.amount) / 100;
  const spentPercentage = (spentAmount / investment.amount) * 100;

  switch (investment.direction) {
    case "up":
      directionIcon = <TrendingUp color="rgb(239 68 68)" size={20} />;
      break;
    case "down":
      directionIcon = <TrendingDown color="rgb(34 197 94)" size={20} />;
      break;
    case "stable":
      directionIcon = <Equal color={"rgb(163 163 163)"} size={18} />;
      break;
    default:
      break;
  }
  return (
    <Link href={`/details/${investment.id}/dashboard`}>
      <Card className="flex flex-col gap-3">
        <div>
          <h2 className="text-2xl font-semibold">{investment.company}</h2>
          <p className="italic text-gray-500">
            {investment.field} - {investment.country}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-xl font-bold">
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: investment.currency,
              maximumFractionDigits: 0,
            }).format(investment.amount)}
          </p>
          <div className="text-xl font-bold flex gap-2 items-center">
            {directionIcon}
            {investment.rate}%
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <p>
              {startDate.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <p>
              {endDate.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <Progress
            value={percentageTime}
            className="h-2"
            indicatorClassName="bg-[#5549C1]"
          />
        </div>
        <div>
          <div className="flex justify-between">
            <p>
              Expenses:{" "}
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: investment.currency,
                maximumFractionDigits: 0,
              }).format(spentAmount)}
            </p>
            <p>{Math.round(spentPercentage)} %</p>
          </div>
          <Progress
            value={spentPercentage}
            className="h-2"
            indicatorClassName="bg-[#99CC00]"
          />
        </div>
      </Card>
    </Link>
  );
}
