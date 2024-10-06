"use client";
import { Button } from "@/components/ui/button";
import { CardText } from "@/components/ui/card";
import { Flex, Flex2, FlexCol } from "@/components/ui/containers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CopyButton } from "@/components/utils/CopyButton";
import { useWallet } from "@/lib/hooks/useWallet";
import { getNetworkInfo, networkArray, type NetworkInfo } from "@/lib/networks";
import { convertToEth, shortAddress } from "@/lib/web3";
import { ArrowDownToLine, ArrowLeftRight, Fuel, Globe, LogOut, Send } from "lucide-react";
import Image from "next/image";

export const foundryAddresses = [
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
];

export function Web3Button() {
  const {
    connectWallet,
    walletAddress,
    isWalletConnected,
    changeAccount,
    changeNetwork,
    changeAccountWithMetamask,
    disconnectWallet,
    network,
    walletBalance,
    allAccounts,
  } = useWallet();

  const {
    name: networkName,
    icon: networkIcon,
    currency: currencyName,
    isMainnet,
  } = getNetworkInfo(network);

  const handleConnect = () => {
    connectWallet();
  };

  const handleChangeNetwork = (network: NetworkInfo) => {
    changeNetwork(network.id);
  };

  const handleChangeAccount = (newWalletAddress: string) => {
    changeAccount(newWalletAddress);
  };

  const handleChangeAccountWithMetamask = () => {
    changeAccountWithMetamask();
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  return (
    <>
      {!isWalletConnected ? (
        <Button onClick={() => handleConnect()}>Connect Wallet</Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="px-2 py-4">
              <Flex className="gap-2 ">
                <Image
                  src={"/metamask.png"}
                  alt="Metamask logo"
                  width={36}
                  height={36}
                  className="rounded-md"
                />
                <div className="flex flex-col text-left text-sm">
                  <p>{shortAddress(walletAddress)}</p>
                  <Flex className="gap-1">
                    <p className="text-neutral-400">
                      {convertToEth(walletBalance).toFixed(3)} {currencyName}
                    </p>
                    <Image
                      src={`/networks/${networkIcon}`}
                      alt="network icon"
                      width={20}
                      height={20}
                    />
                  </Flex>
                </div>
              </Flex>
            </Button>
          </DialogTrigger>

          {/* //TODO 👉 CARD TEXT */}
          <DialogContent className="sm:max-w-[420px]">
            <FlexCol className="gap-6">
              <FlexCol className="items-center justify-center gap-2">
                <Image
                  src={"/metamask.png"}
                  alt="Metamask logo"
                  width={60}
                  height={60}
                  className="rounded-md"
                />
                <Flex2>
                  {/* //TODO */}
                  <p className="ml-[24px]">{shortAddress(walletAddress)}</p>
                  <CopyButton
                    stringToCopy={walletAddress}
                    variant="ghost"
                    size="tiny"
                    iconSize={16}
                  />
                </Flex2>
                <DialogDescription>
                  {convertToEth(walletBalance).toFixed(3)} {currencyName}
                </DialogDescription>
              </FlexCol>

              <Flex className="w-full">
                <Button variant="outline" className="w-full gap-2 text-neutral-300">
                  <Send size={16} color="#ACABAF" /> Send
                </Button>
                <Button variant="outline" className="w-full gap-2 text-neutral-300">
                  <ArrowDownToLine size={16} color="#ACABAF" /> Receive
                </Button>
              </Flex>

              <FlexCol className="w-full gap-2">
                {/* --------- CURRENT NETWORK -------- */}
                <Button variant="outline" className="text-md w-full justify-between">
                  <Flex2>
                    <Image
                      src={`/networks/${networkIcon}`}
                      alt="Network icon"
                      width={30}
                      height={30}
                    />
                    <CardText>{networkName}</CardText>
                    <CardText>{isMainnet ? "(Mainnet)" : "(Testnet)"}</CardText>
                  </Flex2>
                  <Flex2>
                    <Fuel size={20} color="#737373" />
                    <CardText className="text-neutral-500">94</CardText>
                  </Flex2>
                </Button>

                {/* --------- SWITCH NETWORK -------- */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-md w-full justify-start gap-2"
                    >
                      <Globe size={20} color="#ACABAF" />
                      <CardText>Change Network</CardText>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>All networks</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {networkArray.map((network: NetworkInfo, index: number) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => handleChangeNetwork(network)}
                      >
                        <Flex2>
                          <Image
                            src={`/networks/${network.icon}`}
                            alt="network icon"
                            width={20}
                            height={20}
                          />
                          {network.name}
                        </Flex2>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* --------- SWITCH ACCOUNT -------- */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-md w-full justify-start gap-2"
                    >
                      <ArrowLeftRight size={20} color="#ACABAF" />
                      <CardText>Switch Account</CardText>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* // TODO: any */}
                    {allAccounts.map((account: string, index: number) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => handleChangeAccount(account)}
                        className="flex min-w-[150px] justify-between"
                      >
                        {shortAddress(account)}
                        {foundryAddresses.includes(account) ? (
                          <Image
                            src={"/foundry.png"}
                            alt="foundry"
                            width={16}
                            height={16}
                          />
                        ) : (
                          <Image
                            src={"/networks/sepolia.png"}
                            alt="foundry"
                            width={16}
                            height={16}
                          />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* --------- CHANGE ACCOUNT WITH METAMASK -------- */}
                <Button
                  variant="outline"
                  onClick={() => handleChangeAccountWithMetamask()}
                  className="text-md w-full justify-start gap-2"
                >
                  <ArrowLeftRight size={20} color="#ACABAF" />
                  <CardText>Change account with Metamask</CardText>
                </Button>

                {/* --------- DISCONNECT WALLET -------- */}
                <Button
                  variant="outline"
                  onClick={() => handleDisconnect()}
                  className="text-md w-full justify-start gap-2"
                >
                  <LogOut size={20} color="#ACABAF" />
                  <CardText>Disconnect</CardText>
                </Button>
              </FlexCol>
            </FlexCol>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
