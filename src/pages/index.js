import Head from "next/head";
import WalletInfo from "@modules/wallet/components/WalletInfo";
import MetaMaskAuthForm from "@modules/metamask-auth/components/MetaMaskAuthForm";
import CreateNFTForm from "@modules/marketplace/components/CreateNFTForm";
import Explore from "@modules/marketplace/components/Explore";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-800 p-2">
      <Head>
        <title>Simple NFT Marketplace</title>
        <meta name="description" content="simple nft marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <div className="w-full sm:max-w-md pd-2 mx-auto">
          <WalletInfo className="mb-2" />
          <MetaMaskAuthForm />
          <CreateNFTForm />
        </div>
        <Explore />
      </main>

      <footer className=""></footer>
    </div>
  );
}
