import { DAppProvider } from '@usedapp/core'
import '@styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider config={{}}>
      <Component {...pageProps} />
    </DAppProvider>
  )
}

export default MyApp
