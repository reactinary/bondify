"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import INVOICES from "@/data/invoices";

interface InvoicesTableSimpleProps {
  maxItemsToDisplay?: number;
}

export function InvoicesTableSimple({ maxItemsToDisplay }: InvoicesTableSimpleProps) {
  const invoicesToDisplay = maxItemsToDisplay
    ? INVOICES.slice(0, maxItemsToDisplay)
    : INVOICES;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {invoicesToDisplay.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.reference}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.provider}</TableCell>
            <TableCell className="text-right">
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: invoice.currency,
                maximumFractionDigits: 0,
              }).format(invoice.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
