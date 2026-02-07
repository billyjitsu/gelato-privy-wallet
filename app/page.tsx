import { WalletDashboard } from "./components/WalletDashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-gelato-500 to-privy-500 bg-clip-text text-transparent">
              Gelato
            </span>
            {" + "}
            <span className="bg-gradient-to-r from-privy-500 to-gelato-500 bg-clip-text text-transparent">
              Privy
            </span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            Gasless smart wallet onboarding with EIP-7702. 
            Sign in with email, get a smart account, transact without gas.
          </p>
        </header>
        
        <WalletDashboard />
        
        <footer className="mt-16 text-center text-slate-400 text-sm">
          <p>Built with Next.js + Gelato Smart Wallet SDK + Privy</p>
          <div className="mt-2 flex justify-center gap-4">
            <a 
              href="https://docs.gelato.cloud" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gelato-500 transition-colors"
            >
              Gelato Docs
            </a>
            <a 
              href="https://docs.privy.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-privy-500 transition-colors"
            >
              Privy Docs
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
