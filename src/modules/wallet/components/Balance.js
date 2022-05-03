import React from "react";
import { formatEther } from "@ethersproject/units";
import { getCurrency } from "@common/utils/currenciesHelpers";

export default function Balance({ chainId, balance }) {
  const currency = getCurrency(chainId);

  return (
    <p className="px-4 py-1 text-sm font-medium">
      {balance ? (
        <>
          <span className="font-medium">
            {parseFloat(formatEther(balance)).toFixed(3)}
          </span>{" "}
          {currency}
        </>
      ) : (
        "Loading..."
      )}
    </p>
  );
}
