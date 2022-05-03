import { useUserApi } from "../useUserApi";
import { UserContext, initialContext } from "./context";

export function UserProvider({ initValue, children }) {
  const value = useUserApi({ ...initialContext, ...initValue });

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
