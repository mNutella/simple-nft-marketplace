import Head from "next/head";
import WalletInfo from "@modules/wallet/components/WalletInfo";
import MetaMaskAuthForm from "@modules/metamask-auth/components/MetaMaskAuthForm";
import CreateNFTForm from "@modules/marketplace/components/CreateNFTForm";
import FileInput from "@modules/ipfs/components/FileInput";
import { useIPFSApi } from "@modules/ipfs/api/useIPFSApi";

export default function Home() {
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
        <FileInput onChosen={onFileUploaded} />
      </main>

      <footer className=""></footer>
    </div>
  );
}
