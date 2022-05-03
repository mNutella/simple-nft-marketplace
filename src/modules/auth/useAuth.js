import { useEffect, useState } from "react";
import { useEtherBalance, useEthers, useNetwork } from "@usedapp/core";
import { useUser } from "./context/context";

export default function useAuth(authorized) {
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

  useEffect(() => {
    setWalletNotConnected(
      authorized &&
        !account &&
        ((!active && !signIn) || (active && !signIn)) &&
        !isLoading &&
        !error
    );
    setWalletConnecting(authorized && signIn && isLoading && !error);
    setWalletConnected(
      !!(authorized && !isLoading && account && active && signIn && !error)
    );

    if (!isLoading && account && active && !signIn && !error) {
      setSignIn(true);
    }
  }, [authorized, account, active, isLoading, error, signIn]);

  const handleLogIn = () => {
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
    error,
    account,
    balance,
    network,
    activateWallet: handleLogIn,
    deactivateWallet: handleLogOut,
  };
}
