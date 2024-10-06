import Web3 from "web3";

const getContractInstance = (web3: any, abi: any, address: string) => {
  return new web3.eth.Contract(abi, address);
};

export const setContractInstance = async (
  setWeb3: (web3: Web3) => void,
  setContract: (contract: any) => void,
  counterABI: any,
  counterAddress: string,
) => {
  // @ts-expect-error: Property 'ethereum' does not exist on type 'Window & typeof globalThis'.ts(2339)
  const web3 = new Web3(window.ethereum);
  setWeb3(web3);

  const contractInstance = getContractInstance(web3, counterABI, counterAddress);

  setContract(contractInstance);
};

/////////////
//////////
//////////
//////////
//////////
//////////

export const shortAddress = (address: string): string => {
  if (address === null) {
    return "";
  }

  const start = address?.slice(0, 6);
  const end = address?.slice(38);
  return `${start}...${end}`;
};

export const convertToEth = (weiAmount: bigint) => {
  const ethAmount = Number(weiAmount) / 1e18; // Convert to a floating-point number
  return ethAmount;
};

// ⏲️
export const getCurrentTimestamp = () => {
  return Math.floor(Date.now() / 1000);
};

// ⏲️
export const convertTsToDate = (timestamp: number | null): string => {
  if (timestamp === null || isNaN(timestamp)) {
    return "Invalid Date";
  }

  const date = new Date(timestamp * 1000).toLocaleString();
  return date;
};
