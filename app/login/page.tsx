"use client";
import { Card } from "@/components/ui/card";
import { Web3Button } from "@/components/web3/web3-button";
import { useWallet } from "@/lib/hooks/useWallet";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import metamask_icon from "../../public/images/metamask_icon.svg";

export default function LoginPage() {
  const { isWalletConnected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (isWalletConnected) {
      router.push("/investment");
    }
  }, [isWalletConnected, router]);

  return (
    <main>
      <Card className="w-fit flex flex-col gap-2 justify-center items-center mx-auto align-middle absolute top-[30%] left-[calc(50%-123px)]">
        <Image src={metamask_icon} alt="Metamask Logo" width={100} height={100} />

        <Web3Button />
      </Card>
    </main>
  );
}
