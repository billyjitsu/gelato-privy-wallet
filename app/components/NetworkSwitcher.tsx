"use client";

import { useState } from "react";
import { useSwitchChain, useChainId } from "wagmi";
import { mainnet } from "wagmi/chains";
import { katana } from "../lib/chains";

const chains = [
  { ...mainnet, color: "#627EEA" },
  { ...katana, color: "#FF6B6B" },
];

export function NetworkSwitcher() {
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();
  const [isOpen, setIsOpen] = useState(false);

  const currentChain = chains.find((c) => c.id === chainId) || chains[0];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Network</h3>
          <p className="text-sm text-slate-400">Select chain for transactions</p>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            disabled={isPending}
            className="flex items-center gap-2 bg-black/30 hover:bg-black/40 disabled:opacity-50 text-white px-4 py-2 rounded-xl transition-colors"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: currentChain.color }}
            />
            <span>{currentChain.name}</span>
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-20 overflow-hidden">
                {chains.map((chain) => (
                  <button
                    key={chain.id}
                    onClick={() => {
                      switchChain({ chainId: chain.id });
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors ${
                      chainId === chain.id ? "bg-slate-700/50" : ""
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: chain.color }}
                    />
                    <div className="text-left">
                      <div className="text-white font-medium">{chain.name}</div>
                      <div className="text-xs text-slate-400">Chain ID: {chain.id}</div>
                    </div>
                    {chainId === chain.id && (
                      <svg className="w-4 h-4 text-green-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-black/20 rounded-xl p-3">
          <div className="text-xs text-slate-400 uppercase tracking-wider">Chain ID</div>
          <div className="text-white font-mono">{currentChain.id}</div>
        </div>
        <div className="bg-black/20 rounded-xl p-3">
          <div className="text-xs text-slate-400 uppercase tracking-wider">EIP-7702</div>
          <div className="text-green-400 text-sm font-medium">✓ Supported</div>
        </div>
      </div>
    </div>
  );
}
