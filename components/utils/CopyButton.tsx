"use client";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export function CopyButton({ stringToCopy, variant, size, iconSize }: any) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => {
        if (stringToCopy) {
          navigator.clipboard.writeText(stringToCopy);
          toast.success("Copied successfully!");
        } else {
          toast.error("Unable to copy, codeString is undefined");
        }
      }}
    >
      <Copy size={iconSize} color="#9a9fab" />
    </Button>
  );
}
