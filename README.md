# Gelato + Privy Wallet Onboarding

A general wallet onboarding flow using Gelato's account abstraction + Privy for authentication. Users sign in with email (or social/passkey) and get a gasless smart wallet via EIP-7702.

## Features

- **Email/Social Login** via Privy with embedded EOA creation
- **EIP-7702 Smart Accounts** - Same address as EOA across all chains
- **Gasless Transactions** via Gelato's 1Balance paymaster
- **Multi-chain Support** - Ethereum Mainnet + Katana L2
- **TypeScript** + **Tailwind CSS**

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: Privy (@privy-io/react-auth)
- **Account Abstraction**: EIP-7702 via Gelato Smart Wallet SDK
- **Infrastructure**: Gelato Bundler + Paymaster
- **Chains**: Ethereum Mainnet (1) + Katana L2 (747474)

## How It Works

```
User (email/social login)
  ↓
Privy (authentication + embedded EOA via MPC)
  ↓
EIP-7702 Authorization (EOA delegates to smart account)
  ↓
Gelato Smart Wallet SDK (smart wallet client)
  ↓
Gelato Bundler + Paymaster (gas sponsorship via 1Balance)
  ↓
Ethereum Mainnet / Katana L2
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
NEXT_PUBLIC_SPONSOR_API_KEY=your_gelato_sponsor_api_key
```

### 3. Get Your API Keys

**Privy:**
1. Go to [privy.io](https://privy.io)
2. Create an app → Get App ID

**Gelato:**
1. Go to [app.gelato.cloud](https://app.gelato.cloud)
2. Deposit USDC into 1Balance (on Polygon for mainnets)
3. Create a Relay App → Select networks → Get Sponsor API Key

### 4. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── WalletDashboard.tsx    # Main wallet UI
│   │   ├── TransactionForm.tsx    # Send transactions
│   │   └── NetworkSwitcher.tsx    # Chain selector
│   ├── providers/
│   │   └── Web3Provider.tsx       # Privy + Gelato setup
│   ├── hooks/
│   │   └── useSmartWallet.ts      # Wallet interaction hooks
│   ├── lib/
│   │   ├── chains.ts              # Chain configurations
│   │   └── contracts.ts           # Contract ABIs/addresses
│   ├── page.tsx                   # Main page
│   ├── layout.tsx                 # Root layout
│   └── globals.css
├── public/
└── package.json
```

## Chain Configurations

### Ethereum Mainnet
- Chain ID: 1
- EIP-7702: ✅ Supported (post-Pectra)
- Gelato: ✅ Fully supported

### Katana L2
- Chain ID: 747474
- RPC: https://rpc.katana.network/
- Explorer: https://katanascan.com/
- EIP-7702: ✅ Natively supported
- Gelato: ⚠️ Verify support in Gelato dashboard

### Katana Testnet (Bokuto)
- Chain ID: 737373
- RPC: https://rpc-bokuto.katanarpc.com
- Explorer: https://explorer-bokuto.katanarpc.com

## Usage Example

```tsx
import { useSmartWallet } from '@/app/hooks/useSmartWallet';
import { sponsored } from '@gelatonetwork/smartwallet';

function MyComponent() {
  const { client, address, isReady } = useSmartWallet();

  const handleMint = async () => {
    if (!client) return;
    
    const result = await client.execute({
      payment: sponsored(process.env.NEXT_PUBLIC_SPONSOR_API_KEY!),
      calls: [{
        to: NFT_CONTRACT_ADDRESS,
        data: mintCalldata,
        value: 0n,
      }],
    });
    
    const txHash = await result?.wait();
    console.log('Transaction:', txHash);
  };

  return (
    <button onClick={handleMint} disabled={!isReady}>
      Mint NFT (Gasless)
    </button>
  );
}
```

## Gas Payment Options

```typescript
import { sponsored, native, erc20 } from '@gelatonetwork/smartwallet';

// Project sponsors gas (from 1Balance)
payment: sponsored(apiKey)

// User pays in ERC-20
payment: erc20("0xUSDC_ADDRESS")

// User pays in native ETH
payment: native()
```

## Important Notes

- **EIP-7702**: User's smart account address = their EOA address (same across all chains)
- **Gas Sponsorship**: Requires USDC deposit in Gelato 1Balance
- **Katana Support**: Verify Gelato support for chain 747474 in dashboard
- **SDK Status**: Gelato Smart Wallet SDK is in Developer Preview (breaking changes possible)

## References

- [Gelato Docs](https://docs.gelato.cloud)
- [Gelato Smart Wallet SDK](https://github.com/gelatodigital/smartwallet)
- [Gelato React SDK Docs](https://docs.gelato.cloud/smart-wallets/react-sdk)
- [Privy Docs](https://docs.privy.io)
- [Privy EIP-7702 Guide](https://docs.privy.io/recipes/react/eip-7702)
- [Katana Docs](https://superdocs.katana.tools/network-information)

## License

MIT
