"use client";
import Image from "next/image";
import Link from "next/link";
import bondify_logo from "../public/images/logo_bondify.svg";
import { Web3Button } from "./web3/web3-button";

export default function Navbar() {
  return (
    <div className="flex h-16 items-center justify-center px-4">
      <Link href="/investment" className="ml-auto pl-[80px]">
        <Image src={bondify_logo} alt="Bondify Logo" height={160} />
      </Link>

      <div className="ml-auto">
        <Web3Button />
      </div>
    </div>
  );
}
