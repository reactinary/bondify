"use client";
import { useWallet } from "@/lib/hooks/useWallet";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isWalletConnected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!isWalletConnected) {
      router.push("/login");
    }
  }, [isWalletConnected, router]);

  return <div />;
}
