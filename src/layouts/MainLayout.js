import Head from "next/head";
import Navbar from "@common/components/Navbar";
import Footer from "@common/components/Footer";
import Spinner from "@common/components/SVGs/Spinner";
import useAuth from "@modules/auth/useAuth";
import Alert from "@common/components/Alert";

const MainLayout = ({ children, className, authorized }) => {
  const {
    isWalletNotConnected,
    isWalletConnected,
    isWalletConnecting,
    account,
    balance,
    network,
    error,
    activateWallet,
    deactivateWallet,
  } = useAuth();

  return (
    <div className={`relative ${className}`}>
      <Head>
        <title>Simple NFT Marketplace</title>
        <meta name="description" content="simple nft marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="sticky top-0 z-20">
        <Navbar
          account={account}
          balance={balance}
          chainId={network?.chainId}
          onWalletConnect={activateWallet}
          onDeactivate={deactivateWallet}
        />
        {authorized && (
          <Alert content="Only ❄️ OpenSea NFT is currently supported" />
        )}
      </div>

      <main className="container mx-auto px-4 py-1 lg:px-16">
        {authorized && isWalletConnecting && (
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="animate-pulse text-lg text-white">
              Wallet is connecting
            </p>
            <Spinner className="h-10 w-10" />
          </div>
        )}
        {authorized && isWalletNotConnected && (
          <p className="text-center text-xl">Please connect your wallet</p>
        )}
        {authorized && isWalletConnected && children}
        {authorized && error && (
          <p className="text-center text-xl">
            Something went wrong, try reconnect to Metamask
          </p>
        )}
        {!authorized && children}
      </main>

      <Footer className="lg:pb-10" />
    </div>
  );
};

export default MainLayout;
