// Simple counter contract for testing gasless transactions
export const COUNTER_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with deployed contract

export const COUNTER_ABI = [
  {
    inputs: [],
    name: "increment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

// Example NFT contract for minting
export const NFT_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with deployed contract

export const NFT_ABI = [
  {
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "mint",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
