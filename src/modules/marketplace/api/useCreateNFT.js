import { useEffect, useState } from "react";
import { utils } from "ethers";
import { useContractFunction } from "@usedapp/core";
import { MARKETPLACE_ADDRESS } from "@configs/contractsConfig";
import { useContracts } from "@modules/contract/context";

export function useCreateNFT() {
  const { contracts } = useContracts();
  const contract = contracts[MARKETPLACE_ADDRESS];
  const {
    state,
    send: sendCreateMarketplaceNFT,
    resetState,
  } = useContractFunction(contract, "createMarketplaceNFT", {
    transactionName: "createNFT",
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

  const createNFT = async (name, symbol, url, price) => {
    setInProgress(true);
    await sendCreateMarketplaceNFT(name, symbol, url, utils.parseEther(price), {
      value: utils.parseEther("0.025"),
    });
  };

  return {
    inProgress,
    error,
    state,
    createNFT,
    setError,
    resetState,
  };
}
