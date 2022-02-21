import Head from "next/head";
import WalletInfo from "@modules/wallet/components/WalletInfo";
import MetaMaskAuthForm from "@modules/metamask-auth/components/MetaMaskAuthForm";
import Explore from "@modules/marketplace/components/Explore";
import Modal from "@modules/modal/components/Modal";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-800 p-2">
      <Head>
        <title>Simple NFT Marketplace</title>
        <meta name="description" content="simple nft marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <div className="pd-2 mx-auto w-full sm:max-w-md">
          <WalletInfo className="mb-4" />
          <MetaMaskAuthForm />
        </div>
        <Explore />
        <Modal />
      </main>

      <footer className=""></footer>
    </div>
  );
}
