import React from "react";
import { useEtherBalance, useEthers } from "@usedapp/core";
import Address from "./Address";
import Balance from "./Balance";

export default function WalletInfo({ className }) {
  const { account } = useEthers();
  const balance = useEtherBalance(account);

  if (!account) return null;

  return (
    <div
      className={`text-white mx-auto p-2 bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 ${className} `}
    >
      <p className="text-xl text-center font-semibold mb-2">Wallet Info</p>
      <div className="dark:bg-gray-700 w-min mx-auto p-1 flex whitespace-nowrap rounded-lg">
        <div className="px-2 py-1 flex-1 mr-1">
          {balance && <Balance balance={balance} />}
        </div>
        <div className="px-2 py-1 flex-1 text-center dark:bg-gray-600 rounded-lg">
          {account && <Address address={account} />}
        </div>
      </div>
    </div>
  );
}
