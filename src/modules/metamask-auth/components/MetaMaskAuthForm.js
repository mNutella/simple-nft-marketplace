import React from "react";
import { useEthers } from "@usedapp/core";
import Button from "@common/components/Button";
import MetaMaskIcon from "@common/components/SVGs/MetaMaskIcon";
import MainIcons from "@common/components/SVGs/MainIcons";

export default function MetaMaskAuthForm() {
  const { account, activateBrowserWallet } = useEthers();

  if (account) return null;

  return (
    <div className="text-center">
      {!account && (
        <Button
          className="inline-flex items-center px-8 py-3 space-x-2 transition duration-150 border-2 group border-primary shadow-primary/20 hover:bg-primary hover:text-black"
          onClick={activateBrowserWallet}
        >
          <MainIcons icon="wallet" className="block w-5 h-5 text-white group-hover:scale-105 group-hover:text-black lg:hidden" />
          <MetaMaskIcon className="hidden w-5 h-5 transition duration-300 lg:w-5 lg:h-5 lg:block group-hover:scale-105" />
          <span className="hidden ml-1 lg:block whitespace-nowrap">Connect with MetaMask</span>
        </Button>
      )}
    </div>
  );
}
