import { useState } from "react";
import { useIPFSClient } from "./context";

export function useIPFSApi() {
  const ipfsClient = useIPFSClient();

  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const uploadData = async (buffer) => {
    try {
      setLoading(true);
      const result = await ipfsClient.add(buffer);
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
