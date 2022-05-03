import { useEtherBalance, useEthers } from "@usedapp/core";

export default function useAuth(authorized) {
  const { account, active, activateBrowserWallet, deactivate, error, library } =
    useEthers();
  const balance = useEtherBalance(account);

  const isWalletConnected =
    authorized && active && !!library && balance && account && !error;
  balance == null && !account && !error;
  const isWalletNotConnected =
    authorized &&
    ((!active && !library) || (active && library)) &&
    balance == null &&
    !isWalletConnected;
  // const isWalletConnecting =
  //   authorized &&
  //   ((active && !library) || (active && library)) &&
  //   balance == null &&
  //   !error &&
  //   !isWalletConnected &&
  //   !isWalletNotConnected;

  // console.log("------------------------------------");
  // console.log(library);
  // console.log(!!account, !!active, !!balance, !!error, !!library);
  // console.log(
  //   !!isWalletNotConnected,
  //   !!isWalletConnected,
  //   !!isWalletConnecting
  // );

  return {
    isWalletNotConnected,
    isWalletConnected,
    // isWalletConnecting,
    account,
    balance,
    isActive: active,
    activateWallet: activateBrowserWallet,
    deactivateWallet: deactivate,
  };
}
