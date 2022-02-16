import Script from "next/script";
import { DAppProvider } from "@usedapp/core";
import { ContractsProvider } from "@modules/contract/provider";
import { initialContractsAndFactories } from "@configs/contractsConfig";
import { config } from "@configs/etherConfig";
import "@styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <ContractsProvider initValue={initialContractsAndFactories}>
        <Script
          src="https://unpkg.com/flowbite@1.3.3/dist/flowbite.js"
          strategy="beforeInteractive"
        />
        <Component {...pageProps} />
      </ContractsProvider>
    </DAppProvider>
  );
}

export default MyApp;
