import { useEffect, useState } from "react";
import { useEtherBalance, useEthers, useNetwork } from "@usedapp/core";
import { useUser } from "./context/context";

export default function useAuth() {
  const {
    account,
    active,
    activateBrowserWallet,
    deactivate,
    error,
    isLoading,
  } = useEthers();
  const { network } = useNetwork();
  const balance = useEtherBalance(account);
  const { signIn, setSignIn } = useUser();

  const [isWalletNotConnected, setWalletNotConnected] = useState(true);
  const [isWalletConnecting, setWalletConnecting] = useState(false);
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [currentError, setCurrentError] = useState(null);

  useEffect(() => {
    setWalletNotConnected(
      !account &&
        ((!active && !signIn) || (active && !signIn)) &&
        !isLoading &&
        !currentError
    );
    setWalletConnecting(signIn && isLoading && !currentError);
    setWalletConnected(!!(!isLoading && account && active && signIn && !currentError));

    if (!isLoading && account && active && !signIn && !currentError) {
      setSignIn(true);
    }
    // console.log(!!account, active, isLoading, signIn, !!error, !!currentError)
  }, [account, active, isLoading, signIn, currentError]);

  useEffect(() => {
    if (error && !account) {
      setCurrentError(error)
      setSignIn(false);
    }
  }, [error]);

  const handleLogIn = () => {
    currentError && setCurrentError(null);
    activateBrowserWallet();
    setSignIn(true);
  };

  const handleLogOut = () => {
    deactivate();
    setSignIn(false);
  };

  return {
    isWalletNotConnected,
    isWalletConnected,
    isWalletConnecting,
    isActive: active,
    error: currentError,
    account,
    balance,
    network,
    activateWallet: handleLogIn,
    deactivateWallet: handleLogOut,
  };
}
