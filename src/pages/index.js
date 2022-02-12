import Head from "next/head";
import { useEtherBalance, useEthers } from "@usedapp/core";
import WalletInfo from "@common/components/WalletInfo";
import MetaMaskAuthForm from "@common/components/MetaMaskAuthForm";

export default function Home() {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);

  return (
    <div className="min-h-screen bg-gray-700">
      <Head>
        <title>Simple NFT Marketplace</title>
        <meta name="description" content="simple nft marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        {account && <WalletInfo address={account} balance={etherBalance} />}
        <MetaMaskAuthForm
          address={account}
          onActivate={activateBrowserWallet}
          onDeactivate={deactivate}
        />
      </main>

      <footer className=""></footer>
    </div>
  );
}
