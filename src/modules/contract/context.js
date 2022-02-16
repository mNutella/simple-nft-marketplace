import { createContext, useContext } from "react";

export const initialContext = { contracts: {}, factories: {} };

export const ContractsContext = createContext(initialContext);

export const useContracts = () => useContext(ContractsContext);
