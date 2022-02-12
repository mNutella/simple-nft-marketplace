import React from "react";
import Button from "@common/components/Button";

export default function MetaMaskAuthForm({ address, onActivate, onDeactivate }) {
  return (
    <div>
      {!address && <Button text="Sign In 🔐" onClick={onActivate} />}
      {address && <Button text="Sign Out" onClick={onDeactivate} />}
    </div>
  );
}
