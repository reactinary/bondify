"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";

export const appContext = createContext();

export const WalletProvider = ({ children }) => {
  const [web3, setWeb3] = useState();
  const [allAccounts, setAllAccounts] = useState([]);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [networkId, setNetworkId] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);

  // useEffect
  useEffect(() => {
    const checkIfAccountsExist = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        // console.log("Web3: ", web3); // 🖥️ OK

        const accounts = await web3.eth.getAccounts();
        // console.log("Accounts with WEB3: ", accounts); // 🖥️ OK

        setAllAccounts(accounts); // 🖥️🙅‍♂️..

        // console.log("All accounts: ", accounts);
      }
    };

    checkIfAccountsExist();
  }, []);

  // -------- 🦊👛 -------
  // const connectWallet = async () => {
  //   if (doAccountsExist == true) {
  //     try {
  //       const web3 = new Web3(window.ethereum)
  //       setWeb3(web3)

  //       setWalletAddress(allAccounts[0])

  //       window.ethereum.on('accountsChanged', async () => {
  //         const accounts = await web3.eth.getAccounts()
  //         setWalletAddress(accounts[0])
  //         // 🌐
  //         const networkId = await web3.eth.net.getId();
  //         setNetworkId(networkId);
  //         // 💰
  //         const balance = await web3.eth.getBalance(allAccounts[0]);
  //         setWalletBalance(balance);
  //       })

  //       // 🌐
  //       const networkId = await web3.eth.net.getId();
  //       setNetworkId(networkId);

  //       // 💰
  //       const balance = await web3.eth.getBalance(allAccounts[0]);
  //       setWalletBalance(balance);

  //       setIsWalletConnected(true); // 👛
  //     } catch (err) {
  //       console.log(err, 'connect Wallet')
  //     }
  //   } else {
  //     console.log('Please install MetaMask')
  //   }
  // }

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (accounts.length > 0) {
          const selectedAccount = accounts[0];

          setWalletAddress(selectedAccount);

          const balance = await web3.eth.getBalance(selectedAccount);
          setWalletBalance(balance);

          // Subscribe to MetaMask accounts change event
          window.ethereum.on("accountsChanged", async (newAccounts) => {
            const newBalance = await web3.eth.getBalance(newAccounts[0]);
            setWalletAddress(newAccounts[0]);
            setWalletBalance(newBalance);
          });

          const networkId = await web3.eth.net.getId();
          setNetworkId(networkId);

          setIsWalletConnected(true);
        }
      } else {
        console.log("MetaMask not detected");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // -------- 🦊👛 -------
  // ✅ Workig good when interacting with Counter with different addresses for example
  const changeAccount = async (newWalletAddress) => {
    setWalletAddress(newWalletAddress);

    // 💰
    const balance = await web3.eth.getBalance(newWalletAddress);
    setWalletBalance(balance);
  };

  const changeAccountWithMetamask = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const updatedAccounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (updatedAccounts.length > 0) {
          console.log("Selected account: ", updatedAccounts);

          // Subscribe to MetaMask accounts change event
          window.ethereum.on("accountsChanged", async (newAccounts) => {
            console.log("Selected account: ", newAccounts);
            // Handle the account change as needed
          });

          // Fetch network ID, update connected status, etc.
        } else {
          console.log("No account selected by the user.");
        }
      } else {
        console.log("MetaMask not detected");
      }
    } catch (error) {
      console.error("Error changing account:", error);
    }
  };

  // -------- 🦊🌐 -------
  // TODO 👉 Not updating balance accordingly... and maybe issue the network
  const changeNetwork = async (newNetworkId) => {
    setNetworkId(newNetworkId); // OK

    if (web3 && walletAddress) {
      try {
        const balance = await web3.eth.getBalance(walletAddress);
        setWalletBalance(balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    } else {
      console.error("web3 or walletAddress is not available");
    }
  };

  // -------- 🦊👛 -------
  const disconnectWallet = () => {
    setWalletAddress("");
    setIsWalletConnected(false);
  };

  return (
    <appContext.Provider
      value={{
        walletAddress,
        isWalletConnected,
        connectWallet,
        allAccounts,
        disconnectWallet,
        changeAccount,
        changeNetwork,
        changeAccountWithMetamask,
        web3,
        network: networkId,
        walletBalance,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(appContext);
};
