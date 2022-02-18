import { createContext, useContext } from "react";

export const initialContext = null;

export const IPFSContext = createContext(initialContext);

export const useIPFSClient = () => useContext(IPFSContext);
