import React from "react";
import { useEthers } from "@usedapp/core";
import GridList from "@common/components/GridList";
import { useGetItems } from "../api/useGetItems";
import { useBuyNFT } from "../api/useBuyNFT";

export default function Explore() {
  const { account } = useEthers();
  const { data } = useGetItems();
  const { buyNFT } = useBuyNFT();

  if (!account) return null;

  const handleBuy = async ({ contractAddress, price, itemId }) => {
    await buyNFT(contractAddress, price, itemId);
  };

  return (
    <div>
      <GridList items={data} currentAddress={account} onBuy={handleBuy} />
    </div>
  );
}
