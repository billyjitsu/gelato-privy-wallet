"use client";

import { useState, useEffect } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useGelatoSmartWallet } from "@gelatonetwork/smartwallet-react-sdk";
import { formatEther } from "viem";
import { useBalance } from "wagmi";

export function useSmartWallet() {
  const { authenticated, ready, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const { client, isInitialized } = useGelatoSmartWallet();
  const [isReady, setIsReady] = useState(false);

  // Get the embedded wallet from Privy
  const embeddedWallet = wallets.find((w) => w.walletClientType === "privy");
  const address = embeddedWallet?.address;

  // Get balance using wagmi
  const { data: balanceData } = useBalance({
    address: address as `0x${string}` | undefined,
    query: {
      enabled: !!address,
    },
  });

  const balance = balanceData ? formatEther(balanceData.value) : "0";

  useEffect(() => {
    setIsReady(ready && authenticated && isInitialized && !!client);
  }, [ready, authenticated, isInitialized, client]);

  return {
    // Auth
    authenticated,
    ready,
    login,
    logout,
    
    // Wallet
    address,
    balance,
    embeddedWallet,
    
    // Gelato
    client,
    isReady,
    isInitialized,
  };
}
