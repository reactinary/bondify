import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/primitives/collapsible";
import type { BadgeVariants } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BadgeCheck, ChevronsUpDown, SquareArrowOutUpRight } from "lucide-react";
import INVOICES from "../data/invoices";

type TInvoiceTable = {
  isNotCollapsible?: boolean;
  maxItemsToDisplay?: number;
};

export default function InvoiceTable({
  isNotCollapsible,
  maxItemsToDisplay,
}: TInvoiceTable) {
  const invoicesToDisplay = maxItemsToDisplay
    ? INVOICES.slice(0, maxItemsToDisplay)
    : INVOICES;

  return (
    <Table className="bg-white">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            <div className="flex gap-2 items-center">
              <p>Reference</p>
              <ChevronsUpDown color="rgb(163 163 163)" size={16} />
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <p>Status</p>
              <ChevronsUpDown color="rgb(163 163 163)" size={16} />
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <p>Provider</p>
              <ChevronsUpDown color="rgb(163 163 163)" size={16} />
            </div>
          </TableHead>
          <TableHead>
            <div className="flex gap-2 items-center">
              <p>Description</p>
              <ChevronsUpDown color="rgb(163 163 163)" size={16} />
            </div>
          </TableHead>
          <TableHead className="text-right">
            <div className="flex gap-2 items-center">
              <p>Amount</p>
              <ChevronsUpDown color="rgb(163 163 163)" size={16} />
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoicesToDisplay.map((invoice) =>
          isNotCollapsible ? (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.reference}</TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(invoice.status)}>{invoice.status}</Badge>
              </TableCell>
              <TableCell className="flex gap-2 items-center">
                {invoice.provider}
                {invoice.kyb && <BadgeCheck size={20} color="#5549c1" />}
              </TableCell>
              <TableCell>{invoice.description}</TableCell>
              <TableCell className="text-right">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: invoice.currency,
                  maximumFractionDigits: 0,
                }).format(invoice.amount)}
              </TableCell>
            </TableRow>
          ) : (
            <Collapsible asChild key={invoice.id}>
              <>
                <CollapsibleTrigger asChild>
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.reference}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex gap-2 items-center">
                      {invoice.provider}
                      {invoice.kyb && <BadgeCheck size={20} color="#5549c1" />}
                    </TableCell>
                    <TableCell>{invoice.description}</TableCell>
                    <TableCell className="text-right">
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: invoice.currency,
                        maximumFractionDigits: 0,
                      }).format(invoice.amount)}
                    </TableCell>
                  </TableRow>
                </CollapsibleTrigger>
                <CollapsibleContent asChild>
                  <TableRow key={invoice.id}>
                    <TableCell />
                    <TableCell>
                      <p>Billing date:</p>
                      <p>2024-07-17</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-medium">Ledger Account</h3>
                        <p>6251 - Travel expenses</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-medium">ESG Rating</h3>
                        <div className="flex gap-2 items-center">
                          <p className="text-xl text-red-500 font-bold">37</p>
                          <p className="bg-[#5549c1] text-white font-semibold px-2 rounded-md h-6 text-xs flex items-center">
                            certified
                          </p>
                          <p className="underline flex gap-2 items-center text-neutral-500">
                            Reporting 21{" "}
                            <SquareArrowOutUpRight className="text-neutral-500 size-4" />
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </CollapsibleContent>
              </>
            </Collapsible>
          ),
        )}
      </TableBody>
    </Table>
  );
}

function getBadgeVariant(status: string): BadgeVariants["variant"] {
  switch (status) {
    case "unpaid":
      return "unpaid";
    case "paid":
      return "paid";
    case "canceled":
      return "canceled";
    default:
      return "outline";
  }
}
