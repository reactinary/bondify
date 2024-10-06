"use client";
import { Checkbox } from "./ui/checkbox";
import { Card } from "./ui/card";
import { Search, Filter, ArrowDown01, ArrowDown10, ArrowDownAZ, ArrowDownZA } from "lucide-react";

export default function Filters({className}: {className: string}) {
  return <Card className={`p-4 flex justify-between ${className}`}>
    <div className="flex gap-4">
    <div className="flex gap-2">
    <Filter />
    <p>Filters</p>
    </div>
    <p className="text-gray-100">|</p>
<ArrowDown01 />
<ArrowDown10 />
<p className="text-gray-100">|</p>
<ArrowDownAZ />
<ArrowDownZA />
<p className="text-gray-100">|</p>
<div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Completed
      </label>
    </div>
    </div>
 <Search className="ml-auto"/>
  </Card>
}

export function Filters2({className}: {className: string}) {
  return <Card className={`p-4 flex justify-between ${className}`}>
    <div className="flex gap-4">
    <div className="flex gap-2">
    <Filter />
    <p>Filters</p>
    </div>
    <p className="text-gray-100">|</p>
<ArrowDown01 />
<ArrowDown10 />
<p className="text-gray-100">|</p>
<ArrowDownAZ />
<ArrowDownZA />
<p className="text-gray-100">|</p>
    </div>
 <Search className="ml-auto"/>
  </Card>
}