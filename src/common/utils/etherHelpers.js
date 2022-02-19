import { Mainnet, Localhost } from '@usedapp/core'
import { isDevelopment } from './coreHelpers';

export function getMulticallAddresses() {
  if (isDevelopment()) {
    return { [Localhost.chainId]: process.env.NEXT_PUBLIC_MULTICALL_CONTRACT_ADDRESS }
  }

  return { [Mainnet.chainId]: process.env.NEXT_PUBLIC_MULTICALL_CONTRACT_ADDRESS };
}

export function isSameAccount(accountA, accountB) {
  if (!accountA || !accountB) return false;

  return accountA.toLowerCase() === accountB.toLowerCase();
}
