import { ChainId } from "@usedapp/core";
import { isDevelopment } from "./coreHelpers";

export function getMulticallAddresses() {
  if (isDevelopment()) {
    return {
      [ChainId.Localhost]: process.env.NEXT_PUBLIC_MULTICALL_CONTRACT_ADDRESS,
    };
  }

  if (ChainId.Mumbai === process.env.NEXT_PUBLIC_NETWORK) {
    return {
      [ChainId.Mumbai]: process.env.NEXT_PUBLIC_MULTICALL_CONTRACT_ADDRESS,
    };
  }

  if (ChainId.Polygon === process.env.NEXT_PUBLIC_NETWORK) {
    return {
      [ChainId.Polygon]: process.env.NEXT_PUBLIC_MULTICALL_CONTRACT_ADDRESS,
    };
  }

  return {
    [ChainId.Mainnet]: process.env.NEXT_PUBLIC_MULTICALL_CONTRACT_ADDRESS,
  };
}

export function isSameAccount(accountA, accountB) {
  if (!accountA || !accountB) return false;

  return accountA.toLowerCase() === accountB.toLowerCase();
}
