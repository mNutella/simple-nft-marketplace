import { useState } from "react";
import { create } from "ipfs-http-client";

// TODO: extract to context
const ipfsClient = create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});

export function useIPFSApi() {
  //const ipfsClient = useIPFS();

  // todo: bind to callbacks
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const uploadData = async (data) => {
    try {
      setLoading(true);
      const result = await ipfsClient.add(data);
      setLoading(false);
      return result.path;
    } catch (error) {
      setError(error);
      setLoading(false);
    }

    return null;
  };

  return { loading, error, uploadData };
}
