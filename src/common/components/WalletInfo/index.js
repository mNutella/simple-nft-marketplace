import React from "react";
import Address from "./Address";
import Balance from "./Balance";

export default function WalletInfo({ address, balance }) {
  return (
    <div className="bg-gray-500 text-white p-0.5 flex w-min whitespace-nowrap rounded-lg">
      <div className="px-2 py-1 flex-auto mr-1">
        {balance && <Balance balance={balance} />}
      </div>
      <div className="px-2 py-1 bg-slate-700 rounded-md">
        {address && <Address address={address} />}
      </div>
    </div>
  );
}
