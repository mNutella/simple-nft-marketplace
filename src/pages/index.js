import Head from "next/head";
import { useEtherBalance, useEthers } from "@usedapp/core";
import WalletInfo from "@common/components/WalletInfo";
import MetaMaskAuthForm from "@common/components/MetaMaskAuthForm";
import FileInput from "@modules/ipfs/components/FileInput";
import { useIPFSApi } from "@modules/ipfs/api/useIPFSApi";

export default function Home() {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);
  const { uploadData } = useIPFSApi();

  // move to utils
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const onFileUploaded = async (fileBuffer) => {
    console.log(fileBuffer);

    const fileHash = await uploadData(Buffer(fileBuffer));
    const metadataHash = await uploadData(
      JSON.stringify({ rareness: getRandomInt(100), origin: fileHash })
    );

    console.log(metadataHash);
  };

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

        <FileInput onChosen={onFileUploaded} />
      </main>

      <footer className=""></footer>
    </div>
  );
}
