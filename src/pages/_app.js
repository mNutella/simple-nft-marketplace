import { DAppProvider } from "@usedapp/core";
import { ContractsProvider } from "@modules/contract/provider";
import { UserProvider } from "@modules/auth/context/provider";
import { IPFSProvider } from "@modules/ipfs/provider";
import { initialContractsAndFactories } from "@configs/contractsConfig";
import { config } from "@configs/etherConfig";
import { ipfsConfig } from "@configs/ipfsConfig";

import "@styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <ContractsProvider initValue={initialContractsAndFactories}>
        <IPFSProvider config={ipfsConfig}>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </IPFSProvider>
      </ContractsProvider>
    </DAppProvider>
  );
}

export default MyApp;
