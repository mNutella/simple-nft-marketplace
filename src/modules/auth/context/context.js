import { createContext, useContext } from "react";

export const initialContext = { isLogIn: false };

export const UserContext = createContext(initialContext);

export const useUser = () => useContext(UserContext);
