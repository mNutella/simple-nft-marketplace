import { useReducer } from "react";
import { getContract } from "@common/utils/contractHelpers";
import {
  reducer,
  ADD_CONTRACT_TYPE,
  REMOVE_CONTRACT_TYPE,
  ADD_FACTORY_TYPE,
  REMOVE_FACTORY_TYPE,
} from "./reducer";

export function useContractsApi(initValue) {
  const [{ contracts, factories }, dispatch] = useReducer(reducer, initValue);

  const addCreatedContract = (contract) => {
    if (!contract || !contract?.address)
      throw new Error("The contract or address don't exist");

    dispatch({
      type: ADD_CONTRACT_TYPE,
      payload: { name: contract.address, contract },
    });
  };

  const addContract = (contractAddress, contractAbi) => {
    const contract = getContract(contractAddress, contractAbi);

    dispatch({
      type: ADD_CONTRACT_TYPE,
      payload: { name: contractAddress, contract },
    });
  };

  const removeContract = (name) => {
    if (!state.contracts[name])
      throw new Error("Contract with name `" + name + "` doesn't exist");

    dispatch({ type: REMOVE_CONTRACT_TYPE, payload: { name } });
  };

  const addFactory = (name, factory) => {
    if (!name || !factory) throw new Error("Factory data is not full"); // TODO: change error content

    dispatch({ type: ADD_FACTORY_TYPE, payload: { name, factory } });
  };

  const addTest = (name, factory) => {
    dispatch({ type: ADD_FACTORY_TYPE, payload: { name, factory } });
  };

  const removeFactory = (name) => {
    if (!state.factories[name])
      throw new Error("Factory with name `" + name + "` doesn't exist");

    dispatch({ type: REMOVE_FACTORY_TYPE, payload: { name } });
  };

  return {
    contracts,
    factories,
    addTest,
    addCreatedContract,
    addContract,
    removeContract,
    addFactory,
    removeFactory,
  };
}
