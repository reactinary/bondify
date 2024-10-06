"use client";
import InvoiceTable from "@/components/invoice-table";
import { ProvidersTable } from "@/components/providers-table";
import { RateAreaChart } from "@/components/rate-area-chart";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { calculateRingSize, type RingChartProps } from "@/components/ui/chart-rings";
import { DonutChart } from "@/components/ui/donut-chart";
import { H2 } from "@/components/ui/headings";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import INVESTMENTS from "@/data/investments";
import type { Investment } from "@/lib/types/investment";
import { BadgeCheck, HardHat, ScrollText, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";

const HARDCODED_FEES_PAID = 641_512;
const HARDCODED_AMOUNT_SPENT = 4_123_456;

export default function DashboardPage({ params }: { params: { detailsId: string } }) {
  const investmentId = Number.parseInt(params.detailsId, 10);
  const investment = INVESTMENTS.find((inv) => inv.id === investmentId);

  if (!investment) {
    return <div>Investment not found</div>;
  }

  return (
    <div className="py-8 pl-4 flex flex-col gap-4 w-full">
      <div className="flex gap-8">
        <div className="w-[70%] flex flex-col gap-10">
          <HeaderSection investment={investment} />
          <CardSections investment={investment} />
          <Card>
            <RateAreaChart />
          </Card>
        </div>

        <div className="w-[30%] flex flex-col gap-4 pl-2 pr-8">
          <SEGCard />
          <AmountSpendCard investment={investment} />
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-4">
        <section className="flex flex-col gap-4 mr-6">
          <H2 className="flex gap-2 items-center">
            <HardHat className="size-8" />
            Providers
          </H2>
          <ProvidersTable maxItemsToDisplay={5} />

          <Button asChild className="ml-auto">
            <Link href="/details/2/providers">See all providers</Link>
          </Button>
        </section>
        <section className="flex flex-col gap-4 mr-6">
          <div className="flex gap-2 items-center">
            <ScrollText className="size-8" />
            <H2>Invoices</H2>
          </div>
          <InvoiceTable maxItemsToDisplay={5} isNotCollapsible />

          <Button asChild className="ml-auto">
            <Link href="/details/2/invoices">See all invoices</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     ✨ FUNCTIONS ✨                        */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

function HeaderSection({ investment }: { investment: Investment }) {
  return (
    <section>
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

function CardSections({ investment }: { investment: Investment }) {
  // Calculate the maturity date
  const startDate = new Date(investment.date);
  const formattedStartDate = startDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const maturityDate = new Date(
    startDate.setMonth(startDate.getMonth() + investment.maturity),
  );
  const formattedMaturityDate = maturityDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <section className="grid grid-cols-3 gap-4">
      <Card className="flex flex-col gap-2">
        <h3 className="font-medium text-lg">Fees</h3>
        <p className="font-bold text-2xl">
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: investment.currency,
            maximumFractionDigits: 0,
          }).format(HARDCODED_FEES_PAID)}
        </p>
      </Card>
      <Card className="flex flex-col gap-2">
        <h3 className="font-medium text-lg">Current Rate</h3>
        <div className="flex gap-2 items-center">
          <p className="font-bold text-2xl">{investment.rate} %</p>
          <TrendingUp color="rgb(239 68 68)" />
        </div>
      </Card>
      <Card className="flex flex-col gap-2">
        <h3 className="font-medium text-lg">Maturity</h3>
        <div className="flex justify-between text-xs">
          <span>{formattedStartDate}</span>
          <span>{formattedMaturityDate}</span>
        </div>
        <Progress value={29} className="h-2" indicatorClassName="bg-[#5549C1]" />
      </Card>
    </section>
  );
}

function SEGCard() {
  return (
    <Card className="flex flex-col gap-4 justify-center items-center">
      <h3 className="font-medium text-lg">Global Investment ESG</h3>
      <CardDescription className="text-6xl font-bold text-emerald-600 flex gap-2 items-center">
        <TrendingDown color="rgb(239 68 68)" size={48} />
        B-
      </CardDescription>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1">
          <p>Environmental</p>
          <Slider defaultValue={[12]} max={20} step={1} disabled />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>100</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p>Social</p>
          <Slider defaultValue={[75]} max={100} step={1} disabled />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>100</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p>Governance</p>
          <Slider defaultValue={[65]} max={100} step={1} disabled />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>100</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function AmountSpendCard({ investment }: { investment: Investment }) {
  return (
    <Card className="flex flex-col gap-4 justify-center items-center text-center">
      <h3 className="font-medium text-lg">Spending Overview</h3>
      <div>
        <CardDescription className="font-bold text-2xl">
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: investment.currency,
            maximumFractionDigits: 0,
          }).format(HARDCODED_AMOUNT_SPENT)}
        </CardDescription>
        <CardDescription>
          of{" "}
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: investment.currency,
            maximumFractionDigits: 0,
          }).format(investment.amount)}
        </CardDescription>
      </div>

      <ChartRings rings={[{ progress: 57 }]} />
    </Card>
  );
}

function ChartRings({ size = 96, gap = 4, width = 10, rings }: RingChartProps) {
  const totalWidth = calculateRingSize({
    size,
    width,
    gap,
    index: 0,
    total: rings?.length ?? 0,
  });

  return (
    <div
      className="relative flex items-center justify-center rounded-3xl w-fit"
      style={{
        minWidth: totalWidth + gap * (rings?.length ?? 0) * 4,
        minHeight: totalWidth + gap * (rings?.length ?? 0) * 4,
      }}
    >
      {rings?.map((ring, index) => {
        const ringSize = calculateRingSize({
          size,
          width,
          gap,
          index,
          total: rings.length,
        });
        return (
          <DonutChart
            key={`ring_${index}`}
            size={ringSize}
            {...ring}
            progressWidth={width}
            circleWidth={width}
          />
        );
      })}
    </div>
  );
}
