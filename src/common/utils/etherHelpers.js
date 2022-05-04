import { ChainId } from "@usedapp/core";
import { isDevelopment } from "./coreHelpers";

export function getMulticallAddresses() {
  const networkIds = process.env.NEXT_PUBLIC_NETWORK_IDS.split(",");
  const multicallAddresses =
    process.env.NEXT_PUBLIC_MULTICALL_CONTRACT_ADDRESSES.split(",");

  if (!networkIds?.length || !multicallAddresses?.length) return;

  let config = {};

  if (isDevelopment()) {
    config = {
      ...config,
      [ChainId.Localhost]:
        process.env.NEXT_PUBLIC_LOCAL_MULTICALL_CONTRACT_ADDRESS,
    };
  }

  if (networkIds.includes(ChainId.Mumbai.toString())) {
    config = {
      ...config,
      [ChainId.Mumbai]:
        multicallAddresses[networkIds.indexOf(ChainId.Mumbai.toString())],
    };
  }

  if (networkIds.includes(ChainId.Polygon.toString())) {
    config = {
      ...config,
      [ChainId.Polygon]:
        multicallAddresses[networkIds.indexOf(ChainId.Polygon.toString())],
    };
  }

  return config;
}

export function getReadOnlyUrls() {
  const networkIds = process.env.NEXT_PUBLIC_NETWORK_IDS.split(",");
  const providerUrls = process.env.NEXT_PUBLIC_PROVIDER_URLS.split(",");

  if (!networkIds?.length || !providerUrls?.length) return;

  let config = {};

  if (isDevelopment()) {
    config = {
      ...config,
      [ChainId.Localhost]: process.env.NEXT_PUBLIC_LOCAL_PROVIDER_URL,
    };
  }

  if (
    networkIds.includes(ChainId.Mumbai.toString()) &&
    providerUrls[networkIds.indexOf(ChainId.Mumbai.toString())]
  ) {
    config = {
      ...config,
      [ChainId.Mumbai]:
        providerUrls[networkIds.indexOf(ChainId.Mumbai.toString())],
    };
  }

  if (
    networkIds.includes(ChainId.Polygon.toString()) &&
    providerUrls[networkIds.indexOf(ChainId.Polygon.toString())]
  ) {
    config = {
      ...config,
      [ChainId.Polygon]:
        providerUrls[networkIds.indexOf(ChainId.Polygon.toString())],
    };
  }

  return config;
}

export function isSameAccount(accountA, accountB) {
  if (!accountA || !accountB) return false;

  return accountA.toLowerCase() === accountB.toLowerCase();
}
