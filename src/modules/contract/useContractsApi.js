import { useReducer } from "react";
import { getContract } from "@common/utils/contractHelper";
import { reducer, ADD_CONTRACT_TYPE, REMOVE_CONTRACT_TYPE } from "./reducer";

export function useContractsApi(initValue) {
  const [state, dispatch] = useReducer(reducer, initValue);

  const addContract = (name, contractAddress, contractAbi) => {
    const contract = getContract(contractAddress, contractAbi);

    dispatch({ type: ADD_CONTRACT_TYPE, payload: { name, contract } });
  };

  const removeContract = (name) => {
    if (!state[name]) throw new Error("Contract with name `" + name + "` doesn't exist");

    dispatch({ type: REMOVE_CONTRACT_TYPE, payload: { name } });
  };

  const deployContract_ = async (name, contractAbi, contractByteCode) => {
    const contract = deployContract(contractAbi, contractByteCode);

    dispatch({ type: DEPLOY_CONTRACT_TYPE, payload: { name, contract } });
  };

  return {
    contracts: state,
    addContract,
    removeContract,
    deployContract: deployContract_,
  };
}
