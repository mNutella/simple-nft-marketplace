import { useCallback, useEffect, useState } from "react";
import { useDeployContract } from "@modules/contract/useDeployContract";
import { useApprove } from "./useApprove";
import { useMint } from "./useMint";

export function useCreateNFT(ownerAddress) {
  const {
    state: deployState,
    deploy,
    resetState: deployStateReset,
  } = useDeployContract();
  const {
    state: mintState,
    mintNFT,
    resetState: mintStateReset,
  } = useMint(deployState?.contract);
  const {
    state: approveState,
    approve,
    resetState: approveStateReset,
  } = useApprove(deployState?.contract);

  const [inProgress, setInProgress] = useState();

  useEffect(() => {
    if (
      (deployState.status === "Success" &&
        mintState.status === "Success" &&
        approveState.status === "Success") ||
      deployState.status === "Fail" ||
      deployState.status === "Exception" ||
      mintState.status === "Fail" ||
      mintState.status === "Exception" ||
      approveState.status === "Fail" ||
      approveState.status === "Exception"
    ) {
      setInProgress(false);
    }

    if (deployState.status === "Success" && mintState.status === "None") {
      (async () => {
        await mintNFT(ownerAddress, "data.json");
      })();
    }

    if (mintState.status === "Success" && approveState.status === "None") {
      (async () => {
        await approve(
          process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS,
          true
        );
      })();
    }
  }, [deployState, mintState, approveState, ownerAddress, mintNFT, approve]);

  const resetState = useCallback(() => {
    setInProgress(false);
    deployStateReset();
    mintStateReset();
    approveStateReset();
  }, [deployStateReset, mintStateReset, approveStateReset]);

  const createNFT = async (name, abi, bytecode, ...args) => {
    setInProgress(true);

    const deployResult = await deploy(name, abi, bytecode, ...args);

    if (!deployResult) {
    }
  };

  return {
    inProgress,
    deployState,
    mintState,
    approveState,
    createNFT,
    resetState,
  };
}
