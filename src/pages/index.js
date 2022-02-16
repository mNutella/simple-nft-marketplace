import Head from "next/head";
import WalletInfo from "@modules/wallet/components/WalletInfo";
import MetaMaskAuthForm from "@modules/metamask-auth/components/MetaMaskAuthForm";
import CreateNFTForm from "@modules/nft/components/CreateNFTForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-800 p-2">
      <Head>
        <title>Simple NFT Marketplace</title>
        <meta name="description" content="simple nft marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-md mx-auto">
        <WalletInfo className="mb-2" />
        <MetaMaskAuthForm />
        <CreateNFTForm />
      </main>

      <footer className=""></footer>
    </div>
  );
}
