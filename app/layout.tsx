import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AllProviders } from "@/providers/all-providers";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "bondify, when debt meets ESG",
  description: "Made by the So|Bond'Bastic team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AllProviders>
          <main className="container mx-auto flex min-h-screen flex-col">
            <Navbar />
            {children}
          </main>
        </AllProviders>
      </body>
    </html>
  );
}
