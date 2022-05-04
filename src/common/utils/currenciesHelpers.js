import { ChainId } from "@usedapp/core";

export function getCurrency(chainId) {
  switch (chainId) {
    case ChainId.Polygon:
    case ChainId.Mumbai: {
      return "MATIC";
    }
    case ChainId.Mainnet:
    case ChainId.Localhost: {
      return "ETH";
    }
    default: {
      return "UNKNOWN";
    }
  }
}
