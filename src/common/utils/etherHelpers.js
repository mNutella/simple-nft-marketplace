import { Mainnet, Localhost } from '@usedapp/core'

export function getMulticallAddresses() {
  if (process.env.NODE_ENV === "development") {
    return { [Localhost.chainId]: process.env.NEXT_PUBLIC_MULTICALL_CONTRACT_ADDRESS }
  }

  return { [Mainnet.chainId]: process.env.NEXT_PUBLIC_MULTICALL_CONTRACT_ADDRESS };
}