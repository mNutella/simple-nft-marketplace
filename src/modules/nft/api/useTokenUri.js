import { Contract } from "ethers";
import { useCall } from "@usedapp/core";
import SIMPLE_NFT_ABI from "@public/abis/simpleNftAbi.json";

export function useTokenUri(smartAddress, tokenId) {
  const { value, error } =
    useCall(
      smartAddress && {
        contract: new Contract(smartAddress, SIMPLE_NFT_ABI),
        method: "tokenURI",
        args: [tokenId],
      }
    ) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0];
}
