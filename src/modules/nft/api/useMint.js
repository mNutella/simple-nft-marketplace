import { useContractFunction, useEthers } from "@usedapp/core";

export function useMint(contract) {
  const { library } = useEthers();
  const {
    state,
    send: sendMintNFT,
    resetState,
  } = useContractFunction(contract, "safeMint", {
    transactionName: "Mint",
  });

  const mintNFT = async (address, uri) => {
    if (!address || !uri) throw new Error("All parameters are for minting");

    contract.connect(library?.getSigner());
    
    await sendMintNFT(address, uri);
  };

  return { state, mintNFT, resetState };
}
