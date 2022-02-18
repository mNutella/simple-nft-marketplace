import { create } from "ipfs-http-client";
import { IPFSContext } from "@modules/ipfs/context";

export function IPFSProvider({ config, children }) {
  const ipfsClient = create(config);

  return (
    <IPFSContext.Provider value={ipfsClient}>
      {children}
    </IPFSContext.Provider>
  );
}
