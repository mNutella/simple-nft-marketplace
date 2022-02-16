import { useCallback, useState } from "react";
import { ContractFactory } from "ethers";
import { useEthers } from "@usedapp/core";
import { useContracts } from "./context";

export function useDeployContract() {
  const { library, chainId } = useEthers();
  const { factories, addCreatedContract, addFactory } = useContracts();
  const [state, setState] = useState({ status: "None" });

  const resetState = useCallback(() => {
    setState({ status: "None" });
  }, [setState]);

  const deploy = useCallback(
    async (name, abi, bytecode, ...contractArgs) => {
      let deployTransaction = undefined;
      let factory = undefined;

      try {
        if (factories[name]) {
          factory = factories[name].signer
            ? factories[name]
            : factories[name].connect(library?.getSigner());
        } else {
          factory = new ContractFactory(abi, bytecode, library?.getSigner());
        }

        setState({ status: "PendingSignature", chainId });
        const contract = await factory.deploy(...contractArgs);

        deployTransaction = contract.deployTransaction;

        setState({
          deployTransaction,
          contract,
          status: "Mining",
          chainId,
        });

        const receipt = await contract.deployTransaction.wait();

        setState({
          receipt,
          deployTransaction,
          contract,
          status: "Success",
          chainId,
        });

        addFactory(name, factory);
        addCreatedContract(contract);

        return receipt;
      } catch (error) {
        const errorMessage =
          error.error?.message ??
          error.reason ??
          error.data?.message ??
          error.message;

        if (deployTransaction) {
          // TODO: add logic like in usePromiseTransaction (useDapp pck)
          setState({ status: "Fail", errorMessage, chainId });
        } else {
          setState({ status: "Exception", errorMessage, chainId });
        }
      }

      return undefined;
    },
    [factories, chainId, library, addFactory, addCreatedContract]
  );

  return { state, deploy, resetState };
}
