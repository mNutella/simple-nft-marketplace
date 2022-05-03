import Head from "next/head";
import Navbar from "@common/components/Navbar";
import Footer from "@common/components/Footer";
// import Spinner from "@common/components/SVGs/Spinner";
import useAuth from "@modules/auth/useAuth";

const MainLayout = ({ children, className, authorized }) => {
  const {
    isWalletNotConnected,
    isWalletConnected,
    // isWalletConnecting,
    account,
    balance,
    activateWallet,
    deactivateWallet,
  } = useAuth(authorized);

  return (
    <div className={className}>
      <Head>
        <title>Simple NFT Marketplace</title>
        <meta name="description" content="simple nft marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        account={account}
        balance={balance}
        onWalletConnect={activateWallet}
        onDeactivate={deactivateWallet}
      />

      <main className="container px-4 py-1 mx-auto lg:px-16">
        {/* {isWalletConnecting && (
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-lg text-white animate-pulse">
              Wallet is connecting
            </p>
            <Spinner className="w-10 h-10" />
          </div>
        )} */}
        {isWalletNotConnected && (
          <p className="text-xl text-center">Please connect your wallet</p>
        )}
        {isWalletConnected && children}
        {!authorized && children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
