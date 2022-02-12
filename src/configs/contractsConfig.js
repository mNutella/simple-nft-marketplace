import { initContracts } from "@common/utils/contractHelper";
import SIMPLE_NFT_ABI from "@public/abis/simpleNftAbi.json"

export const initialContracts = initContracts([{
  name: "SimpleNFT",
  contractAddress: process.env.NEXT_PUBLIC_SIMPLENFT_CONTRACT_ADDRESS, 
  contractAbi: SIMPLE_NFT_ABI
}]);