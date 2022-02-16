import { ContractsContext, initialContext } from "./context";
import { useContractsApi } from "./useContractsApi";

export function ContractsProvider({ initValue, children }) {
  const value = useContractsApi({ ...initialContext, ...initValue });

  return (
    <ContractsContext.Provider value={value}>
      {children}
    </ContractsContext.Provider>
  );
}
