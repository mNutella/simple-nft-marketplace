import React from "react";
import { useEthers } from "@usedapp/core";
import Button from "@common/components/Button";
import MetaMaskIcon from "@common/components/SVGs/MetaMaskIcon";

export default function MetaMaskAuthForm() {
  const { account, activateBrowserWallet, deactivate } = useEthers();

  return (
    <div>
      {!account && (
        <Button
          text="Connect with MetaMask"
          icon={<MetaMaskIcon />}
          onClick={activateBrowserWallet}
        />
      )}
      {account && <Button text="Sign Out 🚪" onClick={deactivate} />}
    </div>
  );
}
