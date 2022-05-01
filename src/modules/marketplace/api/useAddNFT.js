import { useEffect, useState } from "react";
import { utils } from "ethers";
import { useContractFunction, useEthers } from "@usedapp/core";
import { MARKETPLACE_ADDRESS } from "@configs/contractsConfig";
import { useContracts } from "@modules/contract/context";
import { getContractByProvider } from "@common/utils/contractHelpers";

export function useAddNFT() {
  const { library, account } = useEthers();
  const { contracts } = useContracts();
  const contract = contracts[MARKETPLACE_ADDRESS];
  const {
    state,
    send: sendAddMarketplaceNFT,
    resetState,
  } = useContractFunction(contract, "createMarketplaceItem", {
    transactionName: "addNFT",
  });
  // TODO: replace statuses states and useEffect to useTransactionStatuses
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (state.status === "Success") {
      setInProgress(false);
    }

    if (state.status === "Fail" || state.status === "Exception") {
      setError(true);
      setInProgress(false);
    }
  }, [state]);

  const addNFT = async (contractAddress, tokenId, price) => {
    setInProgress(true);
    const abi = [
      {
        inputs: [
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            internalType: "bool",
            name: "_approved",
            type: "bool",
          },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    const contract = getContractByProvider(
      contractAddress,
      abi,
      library,
      account
    );
    await contract.setApprovalForAll(MARKETPLACE_ADDRESS, true);

    await sendAddMarketplaceNFT(
      contractAddress,
      tokenId,
      utils.parseEther(price),
      {
        value: utils.parseEther(process.env.NEXT_PUBLIC_MARKETPLACE_FEE),
      }
    );
  };

  return {
    inProgress,
    error,
    state,
    addNFT,
    setError,
    resetState,
  };
}
