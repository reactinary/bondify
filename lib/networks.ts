export type NetworkInfo = {
  id: number;
  name: string;
  icon: string;
  currency: string;
  isMainnet?: boolean;
};

export const allNetworks: { [key: number]: NetworkInfo } = {
  1804: {
    id: 1804,
    name: "Kerleano",
    icon: "solbond.png",
    currency: "CRC",
    isMainnet: false,
  },
};

export const networkArray = Object.values(allNetworks);

export const getNetworkInfo = (networkId: number) => {
  const network = allNetworks[networkId];
  return network ? network : { name: "", icon: "", currency: "", isMainnet: false };
};
