import { createContext, useContext } from "react";

export const ContractsContext = createContext({});

export const useContracts = () => useContext(ContractsContext);
