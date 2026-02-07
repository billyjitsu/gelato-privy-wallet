"use client";

import { useSmartWallet } from "../hooks/useSmartWallet";
import { TransactionForm } from "./TransactionForm";
import { NetworkSwitcher } from "./NetworkSwitcher";

export function WalletDashboard() {
  const {
    authenticated,
    ready,
    login,
    logout,
    address,
    balance,
    isReady,
  } = useSmartWallet();

  if (!ready) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gelato-500"></div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <div className="text-center">
          <div className="mb-6">
            <svg 
              className="w-20 h-20 mx-auto text-gelato-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome</h2>
          <p className="text-slate-300 mb-6">
            Sign in with your email to create a gasless smart wallet
          </p>
          <button
            onClick={login}
            className="w-full bg-gradient-to-r from-gelato-500 to-privy-500 hover:from-gelato-600 hover:to-privy-600 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign In with Email
          </button>
          <p className="mt-4 text-sm text-slate-400">
            Powered by Privy + Gelato
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Wallet Card */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">Smart Wallet</h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
              EIP-7702
            </span>
          </div>
          <button
            onClick={logout}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Disconnect
          </button>
        </div>

        <div className="space-y-4">
          {/* Address */}
          <div className="bg-black/20 rounded-xl p-4">
            <label className="text-xs text-slate-400 uppercase tracking-wider">Address</label>
            <div className="flex items-center gap-2 mt-1">
              <code className="text-sm text-white font-mono break-all">
                {address || "Loading..."}
              </code>
              {address && (
                <button
                  onClick={() => navigator.clipboard.writeText(address)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  title="Copy address"
                >
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Balance */}
          <div className="bg-black/20 rounded-xl p-4">
            <label className="text-xs text-slate-400 uppercase tracking-wider">Balance</label>
            <div className="text-2xl font-bold text-white mt-1">
              {parseFloat(balance).toFixed(4)} ETH
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isReady ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <span className="text-sm text-slate-300">
                {isReady ? 'Smart Wallet Ready' : 'Initializing...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <NetworkSwitcher />
      
      {isReady && <TransactionForm />}
    </div>
  );
}
