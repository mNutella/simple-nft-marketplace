import { useEffect, useState } from "react";

export default function useTransactionStatuses(state) {
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (state.status === "Success") {
      setInProgress(false);
    }

    if (state.status === "Fail" || state.status === "Exception") {
      setError(true);
      setInProgress(false);
    }
  }, [state]);

  return { inProgress, error, setInProgress, setError };
}
