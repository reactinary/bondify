"use client";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TailwindIndicator } from "@/components/utils/tailwind-indicator";
import { WalletProvider } from "@/lib/hooks/useWallet";
import { TanstackProvider } from "./tanstack-provider";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function AllProviders({ children }: RootLayoutProps) {
  return (
    <>
      <WalletProvider>
        <TanstackProvider>{children}</TanstackProvider>
      </WalletProvider>

      <TailwindIndicator />
      <Toaster />
      <ToasterSonner richColors />
    </>
  );
}
