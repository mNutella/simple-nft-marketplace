import { initContracts, initFactories } from "@common/utils/contractHelpers";
import SIMPLE_MARKETPLACE from "@public/contracts-data/simpleMarketplace.json";
import SIMPLE_NFT from "@public/contracts-data/simpleNft.json";

export const MARKETPLACE_ADDRESS =
  process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS;

export const initialContracts = initContracts([
  {
    name: "SimpleMarketplace",
    contractAddress: MARKETPLACE_ADDRESS,
    contractAbi: SIMPLE_MARKETPLACE.abi,
  },
]);

export const initialFactories = initFactories([
  {
    name: "SimpleNFT",
    contractAbi: SIMPLE_NFT.abi,
    contractBytecode: SIMPLE_NFT.bytecode,
  },
]);

export const initialContractsAndFactories = {
  contracts: initialContracts,
  factories: initialFactories,
};
