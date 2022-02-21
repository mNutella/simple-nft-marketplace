import React from "react";
import { useEthers } from "@usedapp/core";
import Button from "@common/components/Button";
import MetaMaskIcon from "@common/components/SVGs/MetaMaskIcon";

export default function MetaMaskAuthForm() {
  const { account, activateBrowserWallet } = useEthers();

  if (account) return null;

  return (
    <div>
      {!account && (
        <Button
          appendClassName="inline-flex items-center"
          onClick={activateBrowserWallet}
        >
          <MetaMaskIcon />
          <span className="ml-1">Connect with MetaMask</span>
        </Button>
      )}
    </div>
  );
}
