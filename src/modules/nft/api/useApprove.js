import { useContractFunction, useEthers } from "@usedapp/core";

export function useApprove(contract) {
  const { library } = useEthers();
  const {
    state,
    send: sendApprove,
    resetState,
  } = useContractFunction(contract, "setApprovalForAll", {
    transactionName: "approvalForAll",
  });

  const approve = async (operator, approved) => {
    if (!operator || typeof approved !== "boolean")
      throw new Error("All parameters are required for approving");

    contract.connect(library?.getSigner());

    await sendApprove(operator, approved);
  };

  return { state, approve, resetState };
}
