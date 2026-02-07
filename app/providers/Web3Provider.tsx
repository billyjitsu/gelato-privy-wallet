"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { GelatoSmartWalletContextProvider } from "@gelatonetwork/smartwallet-react-sdk";
import { privy, wagmi as gelatoWagmi } from "@gelatonetwork/smartwallet-react-sdk";
import { katana } from "../lib/chains";

const queryClient = new QueryClient();

// Wagmi config for Privy
const wagmiConfig = createConfig({
  chains: [mainnet, katana],
  transports: {
    [mainnet.id]: http(),
    [katana.id]: http("https://rpc.katana.network/"),
  },
});

// Gelato WaaS provider wrapper
const gelatoPrivyProvider = privy(process.env.NEXT_PUBLIC_PRIVY_APP_ID || "");

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        loginMethods: ["email", "google", "discord", "twitter"],
        appearance: {
          theme: "dark",
          accentColor:="#FF6B6B",
          logo: "https://your-logo-url.com/logo.png",
        },
        embeddedWallets: {
          createOnLogin: "all-users",
          showWalletUIs: false,
        },
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <GelatoSmartWalletContextProvider
            settings={{
              scw: {
                type: "gelato",
              },
              apiKey: process.env.NEXT_PUBLIC_SPONSOR_API_KEY,
              waas: gelatoPrivyProvider,
              wagmi: gelatoWagmi({
                chains: [mainnet, katana],
                transports: {
                  [mainnet.id]: http(),
                  [katana.id]: http("https://rpc.katana.network/"),
                },
              }),
            }}
          >
            {children}
          </GelatoSmartWalletContextProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </PrivyProvider>
  );
}
