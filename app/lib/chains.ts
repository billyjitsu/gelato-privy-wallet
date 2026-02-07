import { defineChain } from "viem";

export const katana = defineChain({
  id: 747474,
  name: "Katana",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.katana.network/"],
    },
    public: {
      http: ["https://rpc.katana.network/"],
    },
  },
  blockExplorers: {
    default: {
      name: "KatanaScan",
      url: "https://katanascan.com",
    },
  },
});

export const katanaTestnet = defineChain({
  id: 737373,
  name: "Katana Testnet (Bokuto)",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-bokuto.katanarpc.com"],
    },
    public: {
      http: ["https://rpc-bokuto.katanarpc.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Bokuto Explorer",
      url: "https://explorer-bokuto.katanarpc.com",
    },
  },
  testnet: true,
});
