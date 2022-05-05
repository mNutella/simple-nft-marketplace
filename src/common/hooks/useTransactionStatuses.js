import { useEffect, useState } from "react";

export default function useTransactionStatuses(state) {
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (state.status === "Success") {
      setInProgress(false);
      setSuccess(true);
    }

    if (state.status === "Fail" || state.status === "Exception") {
      setError(true);
      setInProgress(false);
      setSuccess(false);
    }
  }, [state]);

  return { inProgress, error, setInProgress, setError, success, setSuccess };
}
