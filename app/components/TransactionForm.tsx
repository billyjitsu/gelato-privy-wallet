"use client";

import { useState } from "react";
import { useSmartWallet } from "../hooks/useSmartWallet";
import { sponsored } from "@gelatonetwork/smartwallet";
import { encodeFunctionData } from "viem";
import { COUNTER_CONTRACT_ADDRESS, COUNTER_ABI } from "../lib/contracts";

export function TransactionForm() {
  const { client, address } = useSmartWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [lastTxHash, setLastTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleIncrementCounter = async () => {
    if (!client || !address) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Encode the increment function call
      const data = encodeFunctionData({
        abi: COUNTER_ABI,
        functionName: "increment",
      });

      // Execute via Gelato with gas sponsorship
      const result = await client.execute({
        payment: sponsored(process.env.NEXT_PUBLIC_SPONSOR_API_KEY || ""),
        calls: [
          {
            to: COUNTER_CONTRACT_ADDRESS,
            data,
            value: 0n,
          },
        ],
      });

      const txHash = await result?.wait();
      setLastTxHash(txHash);
    } catch (err) {
      console.error("Transaction failed:", err);
      setError(err instanceof Error ? err.message : "Transaction failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTestTransaction = async () => {
    if (!client || !address) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Send a simple self-transfer (0 value) as a test
      const result = await client.execute({
        payment: sponsored(process.env.NEXT_PUBLIC_SPONSOR_API_KEY || ""),
        calls: [
          {
            to: address as `0x${string}`,
            data: "0x",
            value: 0n,
          },
        ],
      });

      const txHash = await result?.wait();
      setLastTxHash(txHash);
    } catch (err) {
      console.error("Transaction failed:", err);
      setError(err instanceof Error ? err.message : "Transaction failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getExplorerUrl = (hash: string) => {
    // Default to mainnet, you might want to make this chain-aware
    return `https://etherscan.io/tx/${hash}`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <h3 className="text-lg font-semibold text-white mb-4">Gasless Transactions</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleSendTestTransaction}
            disabled={isLoading}
            className="bg-gelato-500 hover:bg-gelato-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl transition-all"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </span>
            ) : (
              "Send Test Transaction"
            )}
          </button>

          <button
            onClick={handleIncrementCounter}
            disabled={isLoading}
            className="bg-privy-500 hover:bg-privy-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl transition-all"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Minting...
              </span>
            ) : (
              "Increment Counter"
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {lastTxHash && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
            <p className="text-green-400 text-sm font-medium mb-2">Transaction Sent! 🎉</p>
            <a
              href={getExplorerUrl(lastTxHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-300 hover:text-green-200 underline break-all"
            >
              View on Explorer: {lastTxHash.slice(0, 20)}...{lastTxHash.slice(-8)}
            </a>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-black/20 rounded-xl">
        <p className="text-xs text-slate-400">
          <strong className="text-slate-300">Gasless:</strong> Transactions are sponsored via Gelato&apos;s 1Balance. 
          No ETH needed for gas fees!
        </p>
      </div>
    </div>
  );
}
