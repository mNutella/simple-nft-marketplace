import Head from "next/head";

import Navbar from "@common/components/Navbar";
import Footer from "@common/components/Footer";

const MainLayout = ({ children, className }) => {
  return (
    <div className={className}>
      <Head>
        <title>Simple NFT Marketplace</title>
        <meta name="description" content="simple nft marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container px-4 mx-auto lg:px-16">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
