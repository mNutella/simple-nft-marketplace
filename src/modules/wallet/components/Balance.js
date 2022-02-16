import React from "react";
import { formatEther } from "@ethersproject/units";

export default function Balance({ balance }) {
  return (
    <p className="text-sm">
      <span className="font-medium">
        {parseFloat(formatEther(balance)).toFixed(3)}
      </span>{" "}
      ETH
    </p>
  );
}
