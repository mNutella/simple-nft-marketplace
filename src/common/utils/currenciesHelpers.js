import { Mainnet, Mumbai, Polygon } from "@usedapp/core";

export function getCurrency(chainId) {
  switch (chainId) {
    case Polygon.chainId: {
      return "MATIC";
    }
    case Mumbai.chainId: {
      return "MATIC";
    }
    case Mainnet.chainId: {
      return "ETH";
    }
    default: {
      return "UNKNOWN";
    }
  }
}
