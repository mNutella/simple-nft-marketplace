import React from "react";
import { useEthers } from "@usedapp/core";
import Button from "@common/components/Button";
import MetaMaskIcon from "@common/components/SVGs/MetaMaskIcon";

export default function MetaMaskAuthForm() {
  const { account, activateBrowserWallet, deactivate } = useEthers();

  return (
    <div>
      {!account && (
        <Button onClick={activateBrowserWallet}>
          <MetaMaskIcon />
          <span className="ml-1">Connect with MetaMask</span>
        </Button>
      )}
      {account && <Button onClick={deactivate}>Sign Out</Button>}
    </div>
  );
}
