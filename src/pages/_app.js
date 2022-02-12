import { DAppProvider } from '@usedapp/core'
import { ContractsProvider } from "@modules/contract/provider";
import { initialContracts } from "@configs/contractsConfig";
import '@styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider config={{}}>
      <ContractsProvider initValue={initialContracts}>
        <Component {...pageProps} />
      </ContractsProvider>
    </DAppProvider>
  )
}

export default MyApp
