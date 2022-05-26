This is a simple boilerplate for NFT marketplace (Ethereum/Polygon).

Only _own_ and _frozen_ OpenSea's NFTs are supported.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
Publish 3 first NFTs from here (they are mocked on the _landing_ page and shouldn't be sold):
- /public/images/nft-1.webp
- /public/images/nft-2.webp
- /public/images/nft-3.webp

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello).

## Environment Variables

Create three files: *.env*, *.env.development* and *.env.production*.

*.env*
```bash
MNEMONIC=YOUR_METAMASK_WALLET_SEED_WORDS
API_URL="https://polygon-mumbai.g.alchemy.com/v2/YOUR_SECRET_ALCHEMY_KEY"
```

*.env.development*
```bash
NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS=YOUR_ADDRESS
NEXT_PUBLIC_MARKETPLACE_FEE=0.0007

NEXT_PUBLIC_IPFS_HOST=ipfs.infura.io
NEXT_PUBLIC_IPFS_PORT=5001
NEXT_PUBLIC_IPFS_PROTOCOL=https
NEXT_PUBLIC_IPFS_URL=https://ipfs.io/ipfs/

MUMBAI_PROVIDER_URL=https://matic-mumbai.chainstacklabs.com
POLYGON_PROVIDER_URL=
NEXT_PUBLIC_LOCAL_PROVIDER_URL=http://127.0.0.1:7545
NEXT_PUBLIC_PROVIDER_URLS=$MUMBAI_PROVIDER_URL

MUMBAI_ID=80001
POLYGON_ID=137
MAINNET_ID=1
LOCALHOST_ID=1337
NEXT_PUBLIC_NETWORK_IDS=$MUMBAI_ID

NEXT_PUBLIC_READ_ONLY_ID=$MUMBAI_ID

MUMBAI_MULTICALL_CONTRACT_ADDRESS=0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc
POLYGON_MULTICALL_CONTRACT_ADDRESS=0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507
NEXT_PUBLIC_LOCAL_MULTICALL_CONTRACT_ADDRESS=YOUR_ADDRESS
NEXT_PUBLIC_MULTICALL_CONTRACT_ADDRESSES=$MUMBAI_MULTICALL_CONTRACT_ADDRESS
```

*.env.production*
```bash
MUMBAI_ID = 80001
POLYGON_ID = 137
MAINNET_ID = 1

NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS=YOUR_ADDRESS
NEXT_PUBLIC_MULTICALL_CONTRACT_ADDRESS=0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc
NEXT_PUBLIC_IPFS_HOST=ipfs.infura.io
NEXT_PUBLIC_IPFS_PORT=5001
NEXT_PUBLIC_IPFS_PROTOCOL=https
NEXT_PUBLIC_IPFS_URL=https://ipfs.io/ipfs/
NEXT_PUBLIC_NETWORK=MUMBAI_ID
NEXT_PUBLIC_MARKETPLACE_FEE=0.0007
```

## Deploy on Vercel

The easiest way to deploy Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
