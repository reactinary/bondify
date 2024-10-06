import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PROVIDERS_DATA_TABLE } from "@/data/providers";
import { ChevronsUpDown } from "lucide-react";

interface ProvidersTableProps {
  maxItemsToDisplay?: number;
}

export function ProvidersTable({ maxItemsToDisplay }: ProvidersTableProps) {
  const dataToDisplay = maxItemsToDisplay
    ? PROVIDERS_DATA_TABLE.slice(0, maxItemsToDisplay)
    : PROVIDERS_DATA_TABLE;

  const getColorClass = (score: number) => {
    if (score >= 80) return "font-bold text-green-700";
    if (score >= 60) return "font-bold text-yellow-500";
    if (score >= 30) return "font-bold text-orange-500";
    return "font-bold text-red-500";
  };

  return (
    <Table className="bg-white">
      <TableHeader>
      <TableRow>
          <TableHead>
          <div className="flex gap-2 items-center"><p>Company Name</p><ChevronsUpDown color="rgb(163 163 163)" size={16}/></div></TableHead>
          <TableHead>
          <div className="flex gap-2 items-center"><p>Total Amount</p><ChevronsUpDown color="rgb(163 163 163)" size={16}/></div></TableHead>
          <TableHead>
          <div className="flex gap-2 items-center"><p>ESG Score</p><ChevronsUpDown color="rgb(163 163 163)" size={16}/></div></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {dataToDisplay.map((provider) => (
          <TableRow key={provider.society}>
            <TableCell>{provider.society}</TableCell>
            <TableCell>{provider.totalAmount}</TableCell>
            <TableCell className={getColorClass(provider.esg)}>{provider.esg}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
